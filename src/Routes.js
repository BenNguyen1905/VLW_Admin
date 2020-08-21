import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useUser } from 'reactfire';

import DefaultLayout from "./layouts/DefaultLayout"
import HomePage from "./pages/HomePage";
import StudentListPage from "./pages/students/StudentListPage";
import StudentEditPage from "./pages/students/StudentEditPage";
import StudentCreatePage from "./pages/students/StudentCreatePage";


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

function onlyAuthenticated(Component) {
	return (props) => {
		const currentUser = useUser();
		return currentUser
			? (<Component {...props} />)
			: (<Redirect to="/" />);
	}
}

const RouteDefault = routeWithLayout(DefaultLayout);

const Routes = () => (
	<Router>
		<Switch>
			<Route path="/" exact>
				<Redirect to="/dashboard" />
			</Route>
			<RouteDefault path="/dashboard" exact component={HomePage} />
			<RouteDefault path="/students" exact component={onlyAuthenticated(StudentListPage)} />
			<RouteDefault path="/students/create" exact component={onlyAuthenticated(StudentCreatePage)} />
			<RouteDefault path="/students/:maSv" exact component={onlyAuthenticated(StudentEditPage)} />
			<Route>
				<Redirect to="/" />
			</Route>
		</Switch>
	</Router>
);

export default Routes;