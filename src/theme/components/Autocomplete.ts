import styled from 'styled-components';
import { withAsyncPaginate, AsyncPaginate } from 'react-select-async-paginate';
import AsyncSelect from 'react-select/async';

// const AutocompleteSelectAsyncPaginate = withAsyncPaginate(AsyncSelect);

/* const StyledAutocomplete = styled(AutocompleteSelectAsyncPaginate)` */
const StyledAutocomplete = styled(AsyncPaginate)`
	// material design input
	width: 100%;
	background: #FFFFFF;
	height: 48px;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 14px;
	z-index: 1000;
	// change ion disabled input color
`;

export default StyledAutocomplete;