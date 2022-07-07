import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import '../css/Header.css';

class Header extends React.Component {
  getImgGravatar = () => {
    const { userEmail } = this.props;
    const email = md5(userEmail).toString();
    const url = `https://www.gravatar.com/avatar/${email}`;
    return url;
  }

  render() {
    const { userName } = this.props;
    return (
<<<<<<< HEAD
      <div>
        <span data-testid="header-player-name">{ userName }</span>
        <img
          data-testid="header-profile-picture"
          src={ this.getImgGravatar() }
          alt="avatar do usuário"
        />
        <br />
        <span data-testid="header-score">Score: 0</span>
      </div>
=======

      <header className="header-container">
        <div className="info-container">
          <div className="info-container-tex">
            <span
              data-testid="header-player-name"
              className="header-info"
            >
              {userName}

            </span>
          </div>
          <img
            data-testid="header-profile-picture"
            src={ this.getImgGravatar() }
            alt="avatar do usuário"
            className="avatar"
          />
          <br />
          <div className="info-container-text">
            <span className="header-info">Pontuação: </span>
            <span data-testid="header-score" className="header-info">
              {score}
            </span>
          </div>
        </div>
      </header>

>>>>>>> 075dd1c49eaf255140fa2cbe7d24172cf9260381
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.loginReducer.userEmail,
  userName: state.loginReducer.userName,
});

export default connect(mapStateToProps)(Header);
