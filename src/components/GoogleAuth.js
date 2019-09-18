import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '403350812251-a95hfieck0gft1lfaeqsevjanqvfg79r.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onSignInClick = () => {
    // coming from gapi
    this.auth.signIn();
  };
  onSignOutClick = () => {
    // coming from gapi
    this.auth.signOut();
  };

  onAuthChange = isSignedIn => {
    // isSignedIn is a bolean coming from the gapi.auth2.getAuthInstance() and it is  passrd to this onAuthChange fucntion
    if (isSignedIn) {
      //this.auth.currentUser.get().getId() is coming from the gapi of google
      // To get the sign in user ID
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon " />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon " />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}
const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};
export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
