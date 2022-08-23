import { IonInput } from '@ionic/react';
import styled from 'styled-components';

const StyledInput = styled(IonInput)`
	// material design input
	--padding-top: 0.75rem;
	--padding-bottom: 0.75rem;
	--padding-start: 1.5rem;
	--padding-end: 1.5rem;
	--border-radius: 0.25rem;
	--background: var(--ion-color-light);
	--color: var(--ion-color-dark);
	--border-color: var(--ion-color-medium);
	--placeholder-color: var(--ion-color-medium);
	--placeholder-opacity: 0.5;
	--box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2);
	--box-shadow-medium: 0px 0px 0px 0px rgba(0, 0, 0, 0.2);
	--box-shadow-large: 0px 0px 0px 0px rgba(0, 0, 0, 0.2);
	--box-shadow-active: 0px 0px 0px 0px rgba(0, 0, 0, 0.2);
	--box-shadow-focus: 0px 0px 0px 0px rgba(0, 0, 0, 0.2);
	--box-shadow-disabled: 0px 0px 0px 0px rgba(0, 0, 0, 0.2);
	--box-shadow-hover: 0px 0px 0px 0px rgba(0, 0, 0, 0.2);
	--box-shadow-hover-active: 0px 0px 0px 0px rgba(0, 0, 0, 0.2);
	--box-shadow-hover-focus: 0px 0px 0px 0px rgba(0, 0, 0, 0.2);
	--box-shadow-hover-disabled: 0px 0px 0px 0px rgba(0, 0, 0, 0.2);
	--box-shadow-focus-active: 0px 0px 0px 0px rgba(0, 0, 0, 0.2);
	--box-shadow-focus-disabled: 0px 0px 0px 0px rgba(0, 0, 0, 0.2);
	--box-shadow-focus-hover: 0px 0px 0px 0px rgba(0, 0, 0, 0.2);
	--box-shadow-focus-hover-active: 0px 0px 0px 0px rgba(0, 0, 0, 0.2);
	--box-shadow-focus-hover-disabled: 0px 0px 0px 0px rgba(0, 0, 0, 0.2);
	--box-shadow-disabled-active: 0px 0px 0px 0px rgba(0, 0, 0, 0.2);
`;

export default StyledInput;