const Nav = () => {
	return (
		<nav className="nav">
			<ul>
				<li>
					<a href="#">
						<div className="nav__icon">
							<svg width="24" viewBox="0 0 24 24">
								<path fill="none" d="M0 0h24v24H0z">
								</path>
								<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7V7h2v10zm4-5h-2V7h2v5zm4 3h-2V7h2v8z">
								</path>
							</svg>
						</div>

						<span className="nav__text">Boards</span>
					</a>
				</li>

				<li>
					<a href="#">
						<div className="nav__icon">
							<svg width="24" viewBox="0 0 512 512">
								<path d="M464 96h-192l-64-64h-160C21.5 32 0 53.5 0 80v352C0 458.5 21.5 480 48 480h416c26.5 0 48-21.5 48-48v-288C512 117.5 490.5 96 464 96zM336 311.1h-56v56C279.1 381.3 269.3 392 256 392c-13.27 0-23.1-10.74-23.1-23.1V311.1H175.1C162.7 311.1 152 301.3 152 288c0-13.26 10.74-23.1 23.1-23.1h56V207.1C232 194.7 242.7 184 256 184s23.1 10.74 23.1 23.1V264h56C349.3 264 360 274.7 360 288S349.3 311.1 336 311.1z">
								</path>
							</svg>
						</div>

						<span className="nav__text">Add a new board</span>
					</a>
				</li>

				<li>
					<a href="#">
						<span className="nav__icon">
							<svg width="24" viewBox="0 0 24 24">
								<path fill="none" d="M0 0h24v24H0z">
								</path>
								<path d="M11 7 9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z">
								</path>
							</svg>
						</span>

						<span className="nav__text">Login</span>
					</a>
				</li>

				<li>
					<a href="#">
						<span className="nav__icon">
							<svg width="24" viewBox="0 0 24 24">
								<path d="M0 0h24v24H0z" fill="none">
								</path>
								<path d="m9 17 3-2.94a9.34 9.34 0 0 0-1-.06c-2.67 0-8 1.34-8 4v2h9l-3-3zm2-5c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m4.47 8.5L12 17l1.4-1.41 2.07 2.08 5.13-5.17 1.4 1.41z" fillRule="evenodd">
								</path>
							</svg>
						</span>

						<span className="nav__text">Register</span>
					</a>
				</li>
			</ul>
		</nav>
	)
}

export default Nav;