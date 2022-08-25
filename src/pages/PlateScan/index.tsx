import React, { useState } from "react";
import {
	IonButton,
	IonCardContent,
	IonContent,
	IonGrid,
	IonImg,
	IonPage,
	IonRow,
	IonText,
} from "@ionic/react";
import "./PlateScan.css";
import Webcam from "react-webcam";
import { ANRPManager } from "../../util/anrp.service";
import { useHistory } from "react-router";

const videoConstraints = {
	width: 1280,
	height: 720,
	facingMode: "user"
};


const ReadPlate: React.FC = () => {



	const [imgPreview, setImgPreview] = useState('');
	const [plate, setPlate] = useState('');
	const history = useHistory();

	function dataURLtoFile(dataurl: string, filename: string) {

		let arr = dataurl.split(',');
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

		const f = dataURLtoFile(imgPreview, 'plate.jpg');
		try {
			console.log('f', f);
			if (f) {
				const resp = await ANRPManager.detectPlate(f);
				console.log('Response received:', resp);
				if (resp.data?.data?.vehicles) {
					const v = resp.data.data.vehicles[0];
					const p = v.plate?.unicodeText;

					if (p) {
						setPlate(p as string);
					}
				}
			}

		} catch (e) {
			console.log('Error:', e);
		}
	}


	return (
		<IonPage class="page">
			<IonContent class="con">
				{imgPreview === '' ? (<Webcam
					audio={false}
					className="camera"
					screenshotFormat="image/jpeg"
					videoConstraints={videoConstraints}
				>
					{({ getScreenshot }) => (
						<button
							className="upButton"
							onClick={() => {
								const imageSrc = getScreenshot()
								if (imageSrc) {
									setImgPreview(imageSrc);
								}
							}}
						>
							Capture photo
						</button>
					)}
				</Webcam>) : (<IonImg className="camera" src={imgPreview} />)}
				{plate !== '' && (<IonText className="upButton" style={{ textAlign: 'center', marginBottom: '12px'}}>{plate}</IonText>)}
				<IonButton className="upButton" onClick={() => plate !== '' ? history.push('/tabs/stock/check-in') : upload()}>{plate !== '' ? 'Confirm' : 'Upload'}</IonButton>
			</IonContent>
		</IonPage>
	);
};

export default ReadPlate;
