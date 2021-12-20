import React, { Component} from 'react';
import { FacebookProvider, Comments } from 'react-facebook';

function Messenger ()  {
    
    var myAppId="229120639337066";
    return (
      <FacebookProvider appId={myAppId}>
        <Comments  href="http://lavenderhkkm.com:3000" />
      </FacebookProvider>
    );
}
export default Messenger;