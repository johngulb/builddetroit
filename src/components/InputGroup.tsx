import styled from '@emotion/styled';

const InputGroupWrapper = styled.div`

`;

export const InputGroup = (props) => {
    return (
        <InputGroupWrapper>
            {props.label && <label>{props.label}</label>}
            <input {...props} />
        </InputGroupWrapper>
    );
}