import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../redux/users/thunks';
import { Form, FormColumn, FormRow } from './styled/Form';
import { Input, InputFeedback } from './styled/Input';
import { Image } from './styled/Image';
import { Button } from './styled/Button';
import { Header, Anchor, NewLabel } from './styled/Font';

class EditUser extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      image: '',
      bio: '',
      errors: {
        nameError: '',
        emailError: '',
        passwordError: '',
      },
    };
  }
  componentDidMount() {
    const { user } = this.props;
    this.setState({
      name: user.name,
      email: user.email,
      password: user.password,
      bio: user.bio,
      image: user.image,
    });
  }
  handleOnChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.validate(name, value));
  };
  handleOnClick = e => {
    e.preventDefault();
    const { name, email, password, bio, image } = this.state;

    const editedUser = {
      name,
      email,
      password,
      bio,
      image,
      userType: 'user',
    };
    this.props.updateUser(this.props.user.id, editedUser);
    this.props.history.push('/userprofile');
  };
  validate = (name, value) => {
    const { errors } = this.state;
    //TODO: Validate on submit for values not in our database NOT onchange
    switch (name) {
      case 'name':
        if (!value) {
          this.setState({
            errors: {
              ...errors,
              nameError: 'Username cannot be blank',
            },
          });
        } else {
          this.setState({
            errors: {
              ...errors,
              nameError: '',
            },
          });
        }
        break;

      case 'email':
        const regex = /\S+@\S+\.\S+/;
        if (!value) {
          this.setState({
            errors: {
              ...errors,
              emailError: 'Email cannot be blank',
            },
          });
        } else if (!regex.test(value)) {
          this.setState({
            errors: {
              ...errors,
              emailError: 'Email invalid',
            },
          });
        } else {
          this.setState({
            errors: {
              ...errors,
              emailError: '',
            },
          });
        }
        break;

      case 'password':
        if (!value) {
          this.setState({
            errors: {
              ...errors,
              passwordError: 'Password cannot be blank',
            },
          });
        } else {
          this.setState({
            errors: {
              ...errors,
              passwordError: '',
            },
          });
        }
        break;
    }
  };
  render() {
    const {
      name,
      email,
      password,
      image,
      bio,
      errors,
      errors: { emailError, passwordError, nameError },
    } = this.state;
    return (
      <Form>
        <Header>Public Profile</Header>
        <FormRow>
          <Image src={image} />
          <Input
            type="text"
            placeholder="Image"
            onChange={this.handleOnChange}
            name="image"
            value={image}
          />
        </FormRow>

        <FormColumn>
          <NewLabel>Username</NewLabel>
          <Input
            type="text"
            placeholder="Username"
            onChange={this.handleOnChange}
            name="name"
            value={name}
          />
          <InputFeedback>{nameError}</InputFeedback>
        </FormColumn>
        <FormColumn>
          <NewLabel>Email</NewLabel>
          <Input
            type="text"
            placeholder="email"
            onChange={this.handleOnChange}
            name="email"
            value={email}
          />
          <InputFeedback>{emailError}</InputFeedback>
        </FormColumn>

        <FormColumn>
          <NewLabel>Password</NewLabel>
          <Input
            type="password"
            placeholder="password"
            onChange={this.handleOnChange}
            name="password"
            value={password}
          />
          <InputFeedback>{passwordError}</InputFeedback>
        </FormColumn>
        <FormColumn>
          <NewLabel>Bio</NewLabel>
          <Input
            type="text"
            placeholder="bio"
            onChange={this.handleOnChange}
            name="bio"
            value={bio}
          />
        </FormColumn>
        <Button
          disabled={
            !name ||
            !email ||
            !password ||
            Object.values(errors).some(val => !!val)
              ? true
              : false
          }
          onClick={this.handleOnClick}
        >
          Update profile
        </Button>
      </Form>
    );
  }
}
const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = dispatch => {
  return {
    updateUser: (id, userInfo) => dispatch(updateUser(id, userInfo)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditUser);