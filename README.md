This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Adding a new journal issue

## Step 1: Add the Category

1. Go into containers/EditArticle.js and NewArticle.js
2. find variable "const categories =..."
3. Remove the existing issue (IE Spring 2021 Issue) and replace it with the new Issue
   **_// remember to do this for both files_**
4. Now that you have the new category, you should publish all the relevant articles under this new category. **You should do this before advancing to step 2**.

## Step 2:

1. Go to containers/Home.js and find the "IssueSection" component
2. In this component there's another component labeled "Issue". This custom component consists of 4 attributes (if you are familiar with react you can modify this component as much as you want in "Components/HomeIssue"):

- query=what is being sent to the APIs and returned. ("posts/category/Fall 2020 Issue" returns all the articles in the Fall 2020 issue category)
- issue = This is the title that is shown to the user
- image = This is the image shown to the user
- volume = This is the volume shown to the user

3. modify the above attributes to be in-line with the new journal you are publishing

## Step 3:

1. Go to App.js and change ` <LinkContainer to="/journal/Fall 2020 Issue">`
   to match the edition of the current Issue (for example, `to="/journal/Spring 2021 Issue`)

## Step 4:

1. Go to containers/Journal.js. This step is a bit more involved and may take a little longer.
2. Change the author names and schools found in lines ~250+
3. Replace the letter to the editor using basic html, follow the same format as existing letter
4. Go to function LoadArticles() [lines ~188] and change the old issue to the new issue, make sure to not delete the /excerpt line
5. Below that, you will find the old link for the issue image, replace that with the new link (prob something like "https://econmag-bucket.s3.amazonaws.com/public/ImageIssue/Spring 2021 Issue.jpg")

## Step 5:

1. Now we want to store the previous issues, go to containers/PrevIssues.js and add the issue being replaced to "const prevIssues" and "const prevVolumes". You can also add more/change them background colors here but make sure to fix some of the logic below

## Random extra info

Website publishing pipeline is through netlify.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
