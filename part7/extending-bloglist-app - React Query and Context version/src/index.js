import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BlogContextProvider } from './context/BlogContext'
import { UserContextProvider } from './context/UserContext'
import { LoginContextProvider } from './context/LoginContext'
import { NotificationContextProvider } from './context/NotificationContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
	<Router>
		<QueryClientProvider client={queryClient}>
			<NotificationContextProvider>
				<LoginContextProvider>
					<BlogContextProvider>
						<UserContextProvider>
							<App />
						</UserContextProvider>
					</BlogContextProvider>
				</LoginContextProvider>
			</NotificationContextProvider>
		</QueryClientProvider>
	</Router>
)
