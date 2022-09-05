import React, { useEffect, useRef, useState } from "react";
import {
	IonImg,
	IonPage,
	IonText,
} from "@ionic/react";
import "./PlateScan.css";
import "../Home.css";
import Webcam from "react-webcam";
import { ANRPManager } from "../../util/anrp.service";
import { useHistory } from "react-router";
import StyledButton from "../../theme/components/Button";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../store";
import { useIntl } from "react-intl";


const videoConstraints = {
	width: 220,
	height: 220,
	facingMode: "environment"
};


const ReadPlate: React.FC = () => {

	const dispatch = useDispatch<Dispatch>();
	const intl = useIntl();
	const [imgPreview, setImgPreview] = useState('');
	const [plate, setPlate] = useState('');
	const inputFile = useRef<HTMLInputElement>(null);
	const history = useHistory();

	useEffect(() => {

		dispatch.purchaseReceipts.removeDraft();
	}, []);

	function dataURLtoFile(data_url: string, filename: string) {

		let arr = data_url.split(',');
		let m = arr[0].match(/:(.*?);/);
		if (m && m[1]) {
			let mime = m[1];
			let bstr = atob(arr[1]);
			let n = bstr.length;
			let u8arr = new Uint8Array(n);

			while (n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}

			return new File([u8arr], filename, { type: mime });
		}

		return null;

	}


	const upload = async () => {

		if (imgPreview === '') {
			inputFile.current!.click();

		} else {

			const f = dataURLtoFile(imgPreview, 'plate.jpg');
			try {

				if (f) {
					const resp = await ANRPManager.detectPlate(f);
					console.log('Response received:', resp);
					if (resp.data?.data?.vehicles) {
						const v = resp.data.data.vehicles[0];
						const f = v.plate?.found as boolean | undefined;
						const p = v.plate?.unicodeText;

						if (p) {
							setPlate(p as string);
							return;
						}

						if (f === false) {
							setImgPreview('');
							setPlate('');
						}
					}


				}

			} catch (e) {
				console.log('Error:', e);
			}
		}
	};

	const proceed = () => {

		dispatch.purchaseReceipts.updateDraft({ lr_no: plate })
		history.push('/tabs/stock/check-in')
	}


	return (
		<IonPage className="plate-scan-page">
			<div className="heading-container">
				<IonText color="primary" class="heading">
					{intl.formatMessage({ id: 'Receive Item', defaultMessage: 'Receive Item' })}
				</IonText>
				<IonText color="primary" class="subtitle">
					{intl.formatMessage({ id: 'Scan the plate number', defaultMessage: 'Scan the plate number' })}
					
				</IonText>
			</div>
			<div className="plate-scan-container">
				{imgPreview === '' ? (<Webcam
					audio={false}
					className="camera"
					screenshotFormat="image/jpeg"
					videoConstraints={videoConstraints}
					width={220}
					height={220}
				>
					{({ getScreenshot }) => (
						<StyledButton
							style={{ width: '100%', padding: '0px 2rem', '--background': 'gray', marginTop: '1rem' }}
							onClick={() => {
								const imageSrc = getScreenshot()
								if (imageSrc) {
									setImgPreview(imageSrc);
								}
							}}
						>
							{intl.formatMessage({ id: 'Capture photo', defaultMessage: 'Capture photo' })}
							
						</StyledButton>
					)}
				</Webcam>) : (<IonImg className="camera" src={imgPreview} />)}
				{/* image selector */}

				<input type="file" accept="image/*" ref={inputFile} style={{ display: 'none' }} onChange={(e) => {

					if (e.target.files && e.target.files[0]) {
						const reader = new FileReader();
						reader.onload = (e) => {
							setImgPreview(reader.result as string);
						}
						reader.readAsDataURL(e.target.files[0]);
					}
				}} />
				{plate !== '' && (
					<div className="plate-scan-result-container">
						<div className="plate-2"><IonText style={{ textAlign: 'center' }}>{plate.slice(0, 2)}</IonText></div>
						<div className="plate-rest">
							<IonText style={{ textAlign: 'center' }}>{plate.slice(2)}</IonText>
							<div className="plate-country">
								<IonImg src="../assets/uzbekistan-flag-icon1.png" />
								<IonText style={{ textAlign: 'center' }}>UZ</IonText>
							</div>
						</div>
					</div>
				)}
				<StyledButton onClick={() => plate !== '' ? proceed() : upload()} style={{ width: '100%', padding: '0px 2rem' }}>{plate !== '' ? intl.formatMessage({ id: 'Confirm', defaultMessage: 'Confirm' }) : intl.formatMessage({ id: 'Upload', defaultMessage: 'Upload' })}</StyledButton>
			</div>
		</IonPage>
	);
};

export default ReadPlate;
