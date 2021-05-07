import React from 'react';
import { Icon } from 'semantic-ui-react';

const Footer = () => (
    <footer style={{color:"#424445",marginBottom:"10px"}}>
        <p style={{float:"left",width:"33.33333%",textAlign:"left",paddingLeft:"15px"}} >  </p>
        <p style={{float:"left",width:"33.33333%",textAlign:"center",color:"#8c8e8f"}}>Copyright © 2021</p>
        <p style={{float:"left",width:"33.33333%",textAlign:"right",paddingRight:"15px"}}> <em><u>Contact us:</u></em> <a href="mailto:99sharmatushar@gmail.com"><Icon name="mail" size="large"/></a> <a href="https://www.linkedin.com/in/99sharmatushar/"><Icon name="linkedin" size="large"/></a></p>
    </footer>
)

export default Footer;