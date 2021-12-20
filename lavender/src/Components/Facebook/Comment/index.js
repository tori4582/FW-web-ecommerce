import React, { Component } from 'react';
import { FacebookProvider, Messengers } from 'react-facebook';

function Comment(props) {
  return (
    // <div class="fb-comments" data-href={props} data-width="100%" data-numposts="5"></div>

      <FacebookProvider appId="442858464151966">
        <Messengers  href="http://lavenderhkkm.com:3000" />
      </FacebookProvider>
    // 
  );
}
export default Comment;