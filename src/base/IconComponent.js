import styled from 'styled-components';

const SVGIcon = styled.img`
  width: auto;
`
const IconComponent = ({ fileName, alt, className }) => <SVGIcon className={className} src={`${fileName}`} alt={alt || fileName.replace('.svg', '')} />

export default IconComponent
