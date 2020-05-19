import React from 'react';
import styled from 'styled-components';

export const InputComponent = ({ id, label, register, required, errors, type }) => { 
    
    return(
    <InputWrapper>
        <Label>{label}</Label>
        <StyledTextField 
            type={type} 
            name={id} 
            ref={register({required: required ? 'This field is required.' : false})} />
        {errors[id]  && <Info>{errors[id].message}</Info>}
    </InputWrapper>
    )
}

export const SelectComponent = ({ id, label, register, required, options, errors }) => { 
    console.log(errors)
    return(
    <InputWrapper>
        <Label>{label}</Label>
        <StyledSelect 
            name={id} 
            ref={register({required})} 
        >
            <option value={null}></option>
            {options.map(optn=>(
                <option value={optn.id}>{optn.label}</option>
            ))}
        </StyledSelect>
        {errors[id]  && <Info>This field is required.</Info>}
    </InputWrapper>
    )
}

export const StyledTextField = styled.input`
    border: 1px solid ${({theme})=> theme.colors.buttonBorder};
    border-radius: 18px;
  
    padding: ${({padding})=> padding || '2px 15px' };
    background: ${({theme})=>theme.colors.buttonBackground};
    color: ${({theme})=>theme.colors.text};
    width: 100%;
    height: 40px;
    transition: all .3s;
    &:hover{
        background: ${({theme})=> theme.colors.buttonBackgroundHover};
    }
    &:focus{
        background: ${({theme})=> theme.colors.buttonBackgroundHover};
        border: 1px solid ${({theme})=> theme.colors.text};
    }
    @media only screen and (max-width: ${({theme})=>theme.breakpoints.s}) {
        height: 25px;
      }
`;
export const StyledSelect = styled.select`
    border: 1px solid ${({theme})=> theme.colors.buttonBorder};
    border-radius: 18px;
  
    padding: ${({padding})=> padding || '2px 15px' };
    background: ${({theme})=>theme.colors.buttonBackground};
    color: ${({theme})=>theme.colors.text};
    width: 100%;
    height: 40px;
    transition: all .3s;
    &:hover{
        background: ${({theme})=> theme.colors.buttonBackgroundHover};
    }
    &:focus{
        background: ${({theme})=> theme.colors.buttonBackgroundHover};
        border: 1px solid ${({theme})=> theme.colors.text};
    }
    @media only screen and (max-width: ${({theme})=>theme.breakpoints.s}) {
        height: 25px;
      }
`;
export const InputWrapper = styled.div`
    margin:0 3px  10px 3px;
`;
export const Label = styled.label`
    margin-left: 10px;
    color: ${({theme})=>theme.colors.text};
`;