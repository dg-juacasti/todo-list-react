
import styled from 'styled-components'

export const ContainerStyles = styled.div`
    margin-top: 20px;
    height: 40px;
    width: 100%;
    /* background: "#b1b115"; */
    border: 1px solid #857f7f;
    border-radius: 50px;
`
interface IPercentage {
    percentage: string
  }

export const FillerStyles = styled.div<IPercentage>`
    height: 100%;
    /* width:${ (props:IPercentage ) =>  `${props.percentage}%` }; */
    border-radius: 'inherent';
    text-align: center;
    
`

export const LabelStyles  = styled.div`
    padding: 5px;
    color: #3b0707;
    font-weight: bold;
    
`