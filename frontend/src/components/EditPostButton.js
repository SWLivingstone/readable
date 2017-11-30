import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import Edit from 'material-ui/svg-icons/image/edit'

class EditPostButton extends Component {
  state = {
    fireRedirect: false
  }

  fireRedirect() {
    this.setState({fireRedirect: true})
  }

  render() {
    return(
      <div className="edit-post-button">
        {this.state.fireRedirect && (<Redirect to={{ pathname: '/add-post', state: { post: this.props.post } }} />)}
        <RaisedButton
          label="Edit Post"
          onClick={() => this.fireRedirect()}
          icon={<Edit/>}
        />
      </div>
    )
  }
}

export default EditPostButton
