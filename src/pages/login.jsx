/**
 * Internal dependencies.
 */
import FormLogin from '@/components/form-login/form-login';
import Section from '@/components/section/section';
import Stack from '@/components/stack/stack';


const Login = () => {
	return (
		<Section title="Login" className="section--alt">
			<Stack style={{ height: "100%"}}>
				<Stack.Item cols="2" className="section__col">
					<FormLogin />
				</Stack.Item>

				<Stack.Item cols="2" className="section__col bg-blue">
					<svg xmlnsXlink="http://www.w3.org/2000/svg" fill="#fff" width="200" height="200" viewBox="0 0 24 24">
						<path fill="none" d="M0 0h24v24H0z">
						</path>
						<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7V7h2v10zm4-5h-2V7h2v5zm4 3h-2V7h2v8z">
						</path>
					</svg>
				</Stack.Item>				
			</Stack>
		</Section>
	)
}

export default Login;