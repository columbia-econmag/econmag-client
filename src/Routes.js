import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "./components/AsyncComponent";
// import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

const AsyncHome = asyncComponent(() => import("./containers/Home"));
const AsyncLogin = asyncComponent(() => import("./containers/Login"));
const AsyncNotes = asyncComponent(() => import("./containers/Articles"));
const AsyncSignup = asyncComponent(() => import("./containers/Signup"));
const AsyncNewNote = asyncComponent(() => import("./containers/NewArticle"));
const AsyncNotFound = asyncComponent(() => import("./containers/NotFound"));

export default ({ childProps }) => (
  <Switch>
    <Route path="/" exact component={AsyncHome} />
    <UnauthenticatedRoute path="/login" exact component={AsyncLogin} />
    <UnauthenticatedRoute path="/signup" exact component={AsyncSignup} />
    <AuthenticatedRoute path="/articles/new" exact component={AsyncNewNote} />
    <AuthenticatedRoute path="/post/:_id" exact component={AsyncNotes} />
    {/* Finally, catch all unmatched routes */}
    <Route component={AsyncNotFound} />
  </Switch>
);
