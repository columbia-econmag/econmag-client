import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "./components/AsyncComponent";
// import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
// import { Auth } from "aws-amplify";

const AsyncHome = asyncComponent(() => import("./containers/Home"));
const AsyncEdit = asyncComponent(() => import("./containers/EditArticle")); //TOADD
const AsyncAuthor = asyncComponent(() => import("./containers/Author")); //TOADD
const AsyncEditorHome = asyncComponent(() => import("./containers/UserHome")); //TOADD
const AsyncCategory = asyncComponent(() => import("./containers/Category")); //TOADD
const AsyncLogin = asyncComponent(() => import("./containers/Login"));
const AsyncNotes = asyncComponent(() => import("./containers/Articles"));
const AsyncSignup = asyncComponent(() => import("./containers/Signup"));
const AsyncNewArticle = asyncComponent(() => import("./containers/NewArticle"));
const AsyncRecent = asyncComponent(() => import("./containers/Recent"));
const AsyncNotFound = asyncComponent(() => import("./containers/NotFound"));

export default ({ childProps }) => (
  <Switch>
    <Route path="/" exact component={AsyncHome} />
    <AuthenticatedRoute path="/editor" exact component={AsyncEditorHome} />

    <Route path="/author/:post_author" exact component={AsyncAuthor} />

    <Route path="/category/:post_category" exact component={AsyncCategory} />
    <Route path="/recent" exact component={AsyncRecent} />
    <Route path="/post/:_id" exact component={AsyncNotes} />
    <UnauthenticatedRoute path="/login" exact component={AsyncLogin} />
    <AuthenticatedRoute path="/signup" exact component={AsyncSignup} />

    <AuthenticatedRoute
      path="/articles/new"
      exact
      component={AsyncNewArticle}
    />

    <AuthenticatedRoute path="/post/:_id/edit" exact component={AsyncEdit} />
    {/* Finally, catch all unmatched routes */}
    <Route component={AsyncNotFound} />
  </Switch>
);
