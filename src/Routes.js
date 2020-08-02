import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import DefaultLayout from "./layouts/DefaultLayout"
import StudentListPage from "./pages/students/StudentListPage";
import StudentEditPage from "./pages/students/StudentEditPage";


function routeWithLayout(Layout) {
	return ({component: Component, ...props}) => (
		<Route {...props} render={(routeProps) => (
				<Layout>
					<Component {...routeProps} />
				</Layout>
			)}
		/>
	);
}

const RouteDefault = routeWithLayout(DefaultLayout);

const Routes = () => (
	<Router>
		<Switch>
			<Route path="/" exact>
                <Redirect to="/students" />
            </Route>
			<RouteDefault path="/students" exact component={StudentListPage} />
			<RouteDefault path="/students/:id" exact component={StudentEditPage} />

			{/* <RouteDefault
				component={NotFoundPage}
				showBanner={false}
			/> */}
		</Switch>
	</Router>
);

export default Routes;