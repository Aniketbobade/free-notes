module.exports = registration = (firstName, lastName, link) => {
    return `<h1>User Registration</h1>
    <p>
    Welcome ${firstName} ${lastName}. you have register for Free Notes Application.
    Please set your password using below link ${link}
    </p>`;
  };