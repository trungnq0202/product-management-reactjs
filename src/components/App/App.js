import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import NotFound from "../../pages/error/NotFound/NotFound";
import CategoryManagement from "../../pages/categoryManagement/CategoryManagement";
import ProductManagement from "../../pages/productManagement/ProductManagement";
import AddCategory from "../../pages/categoryManagement/addCategory/AddCategory";
import EditCategory from "../../pages/categoryManagement/editCategory/EditCategory";

import "./App.css";
import AddProduct from "../../pages/productManagement/addProduct/AddProduct";
import EditProduct from "../../pages/productManagement/editProduct/EditProduct";

class App extends Component {
  static propTypes = {
    history: PropTypes.object,
  };

  componentWillMount() {
    // this.props.autoLoggingIn();
  }

  render() {
    const routes = (
      <Switch>
          <Route 
            path="/category-management/add"
            component={AddCategory}
          />
          <Route 
            path="/category-management/edit/:id"
            component={EditCategory}
          />
          <Route
            path="/category-management"
            component={CategoryManagement}
          />
          <Route 
            path="/product-management/add"
            component={AddProduct}
          />
          <Route 
            path="/product-management/edit/:id"
            component={EditProduct}
          />
          <Route
            path="/product-management"
            component={ProductManagement}
          />
          <Route path="/" exact component={CategoryManagement} />
          <Route path="*" component={NotFound} />
      </Switch>
    );

    return (
      <ConnectedRouter history={this.props.history}>{routes}</ConnectedRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // isAuthenticated: state.auth.account != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // autoLoggingIn: () => dispatch(tryAutoLoggingIn()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
