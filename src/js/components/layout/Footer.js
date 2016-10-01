import React from "react";


export default class Footer extends React.Component {
  render() {
    const footerStyles = {
      marginTop: "30px",
    };

    return (
      <footer style={footerStyles} class="container">
        <div class="row">
          <div class="col-lg-12">
            <p>Copyright &copy; 誠書股份有限公司</p>
          </div>
        </div>
      </footer>
    );
  }
}
