import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { paperStyle } from '../../common/styles';
import { MessageDiv } from '../../common/styledComponents';

class SecretPage extends Component {
    render = () => {
        return (
            <div>
                <div>
                    <Paper style={paperStyle}>
                        <MessageDiv>
                            The secret is there are no secrets!
                        </MessageDiv>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default SecretPage;
