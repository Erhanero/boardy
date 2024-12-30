const LoadingSpinner = ({width, className}) => (
	<svg xmlns="http://www.w3.org/2000/svg" className={className} width={width} viewBox="0 0 200 200">
		<defs>
			<radialGradient
				id="a12"
				cx="0.66"
				fx="0.66"
				cy="0.3125"
				fy="0.3125"
				gradientTransform="scale(1.5)"
			>
				<stop offset="0" stopColor="#FF156D" />
				<stop offset="0.3" stopColor="#FF156D" stopOpacity="0.9" />
				<stop offset="0.6" stopColor="#FF156D" stopOpacity="0.6" />
				<stop offset="0.8" stopColor="#FF156D" stopOpacity="0.3" />
				<stop offset="1" stopColor="#FF156D" stopOpacity="0" />
			</radialGradient>
		</defs>
		<circle
			transform-origin="center"
			fill="none"
			stroke="#b0b0b0"
			strokeWidth="15"
			strokeLinecap="round"
			strokeDasharray="200 1000"
			strokeDashoffset="0"
			cx="100"
			cy="100"
			r="70"
		>
			<animateTransform
				type="rotate"
				attributeName="transform"
				calcMode="spline"
				dur="2s"
				values="360;0"
				keyTimes="0;1"
				keySplines="0 0 1 1"
				repeatCount="indefinite"
			/>
		</circle>
		<circle
			transform-origin="center"
			fill="none"
			opacity="0.2"
			stroke="#FFF"
			strokeWidth="15"
			strokeLinecap="round"
			cx="100"
			cy="100"
			r="70"
		/>
	</svg>
)

export default LoadingSpinner;