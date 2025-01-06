const NavActions = ({ title, links }) => {
	return (
		<nav className="nav-actions">
			{title && <h6>{title}</h6>}

			<ul>
				{links.map((link, index) => (
					<li key={index}>
						<button
							onClick={link.onClick}							
						>
							{link.label}
						</button>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default NavActions;