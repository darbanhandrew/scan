import { useEffect, useState } from 'react';
import {
	IonPage,
	IonText
} from "@ionic/react";
import { QRCodeSVG } from 'qrcode.react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Dispatch, RootState } from "../../store";
import "./sendItemQR.css";
import "../Home.css";
import "../Login/login.css";
import { useIntl } from 'react-intl';
import { StockEntry } from '../../types/StockEntry.type';
import StyledButton from '../../theme/components/Button';

const SendItemQR: React.FC = () => {

	const dispatch = useDispatch<Dispatch>();
	
	const history = useHistory();
	const params = useParams<{ docname: string | undefined }>();
	const intl = useIntl();
	const [stockEntry, setStockEntry] = useState<StockEntry>();

	const [loading, setLoading] = useState(true);

	useEffect(() => {

		if (params.docname) {
			loadDoc(params.docname);
		} else {

			setLoading(false);
		}

	}, [params])

	const loadDoc = async (docname: string) => {
		try {
			const resp = await dispatch.stock.getSE({ name: docname, fields: ['*'] });
			setStockEntry(resp.data.data);
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	const proceed = () => {


		history.push("/tabs/list");
	}

	if (loading || stockEntry === undefined) return (<IonPage />)

	return (
		<IonPage className="truck">
			<div className="heading-container">
				<IonText color="primary" class="heading">
					{intl.formatMessage({ id: "Send Item", defaultMessage: "Send Item" })}
				</IonText>
				<IonText color="primary" class="subtitle">
					{intl.formatMessage({ id: "Let the driver take a picture of this QR code or print this give it to him", defaultMessage: "Let the driver take a picture of this QR code or print this give it to him" })}
				</IonText>
			</div>
			<div className="form-container" style={{ flex: 5, justifyContent: 'flex-start' }}>
				<div className="field-container">
					<div className="item-container">

						<QRCodeSVG value={JSON.stringify(stockEntry)} />
					</div>
					<div className="item-container">
						<StyledButton style={{ width: '100%', height: '38px' }} onClick={() => proceed()}>
							{intl.formatMessage({ id: "Save", defaultMessage: "Save" })}
						</StyledButton>
					</div>
				</div>
			</div>

		</IonPage>
	);
};

export default SendItemQR;
