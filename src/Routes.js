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
const AsyncSearch = asyncComponent(() => import("./containers/Search"));
const AsyncJournal = asyncComponent(() => import("./containers/Journal"));
const AsyncReset = asyncComponent(() => import("./containers/ResetPassword"));
const AsyncAbout = asyncComponent(() => import("./containers/AboutUs"));
const AsyncPrev = asyncComponent(() => import("./containers/PrevIssues"));
const AsyncIssue = asyncComponent(()=> import("./containers/NewIssue"));
const Announcements = asyncComponent(() => import("./containers/Announcements"));
const Podcast = asyncComponent(() => import("./containers/Podcast"));


export default ({ childProps }) => (
  <Switch>
    <Route path="/" exact component={AsyncHome} />
    <AuthenticatedRoute path="/editor" exact component={AsyncEditorHome} />

    <Route path="/author/:post_author" exact component={AsyncAuthor} />
    <Route path="/search" exact component={AsyncSearch} />
    <Route path="/category/:post_category" exact component={AsyncCategory} />
    <Route path="/recent" exact component={AsyncRecent} />
    <Route path="/journal/:journal_year" exact component={AsyncJournal} />
    <Route path="/post/:_id" exact component={AsyncNotes} />
    <Route path="/login/reset" exact component={AsyncReset} />
    <Route path="/about" exact component={AsyncAbout} />
    <Route path="/previousIssues" exact component={AsyncPrev} />
      <Route path="/announcements" exact component={Announcements} />
      <Route path="/podcast" exact component={Podcast} />

    <UnauthenticatedRoute path="/login" exact component={AsyncLogin} />
    <AuthenticatedRoute path="/signup" exact component={AsyncSignup} />

    <AuthenticatedRoute
      path="/articles/new"
      exact
      component={AsyncNewArticle}
    />

<AuthenticatedRoute
      path="/issue/new"
      exact
      component={AsyncIssue}
    />

    <AuthenticatedRoute path="/post/:_id/edit" exact component={AsyncEdit} />
    {/* Finally, catch all unmatched routes */}
    <Route component={AsyncNotFound} />
  </Switch>
);
