import styled from 'styled-components'

const Styled = styled.h4`
    display: block;
    margin: ${({margin})=>margin || '0'};
    text-align: ${({align})=>align || 'center'};
    
`

export default styled(Styled).attrs(props => ({
    as: props.as ? props.as : 'span'
  }))`
    font-weight: ${({fWeight})=>fWeight || '600'};
    font-family: ${({family})=> family || "'Open Sans', sans-serif"};
    font-size: ${({fontSize})=> fontSize || '1rem'};
    ${({hide})=>hide && `
        overflow: hidden;
        text-overflow: ellipsis;
    `}
    ${({color, theme})=> {
        switch(color){
            case 'primary':
                return 'color: '+ theme.colors.primary
            case 'light':
                return 'color: '+ theme.colors.light
            case 'textButton':
                return 'color: '+ theme.colors.buttonText
            case 'text':
                return 'color: '+ theme.colors.text
            case 'pink':
                return 'color: '+ theme.colors.pink
            case 'title':
                return 'color: '+ theme.colors.title
            case 'salary':
                return 'color: '+ theme.colors.salary
            case 'span':
                return 'color: '+ theme.colors.span
            case 'white':
                return 'color: '+ theme.colors.white
            case 'logo':
                return 'color: '+ theme.colors.logo
            
        }
    }};
  `