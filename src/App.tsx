import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
	Github,
	Code,
	Users,
	Zap,
	Shield,
	ExternalLink,
	Star,
	Download,
	User,
	Terminal,
	Linkedin,
	Heart,
	Lock,
	Globe,
	Rocket
} from "lucide-react"
import { useState, useEffect } from "react"

const ScrollOverlay = () => {
	const [scrollY, setScrollY] = useState(0)

	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY)
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	// Calculate opacity based on scroll position and viewport height
	const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800
	const scrollProgress = Math.min(scrollY / (viewportHeight * 0.3), 1) // Fade in over 30% of viewport height

	// Create the gradient effect based on scroll position
	const gradientOpacity = Math.min(scrollProgress, 0.8) // Max 80% opacity

	return (
		<div
			className="fixed inset-0 pointer-events-none transition-opacity duration-300 ease-out"
			style={{
				zIndex: 9999,
				background: `linear-gradient(to top, rgba(0,0,0,${gradientOpacity}) 0%, rgba(0,0,0,${gradientOpacity * 0.6}) 8%, rgba(0,0,0,${gradientOpacity * 0.2}) 18%, rgba(0,0,0,${gradientOpacity * 0.05}) 25%, transparent 30%)`,
				opacity: scrollProgress
			}}
		/>
	)
}

const ColoredTypewriterText = ({ delay = 100, startDelay = 1000 }: { delay?: number, startDelay?: number }) => {
	const segments = [
		{ text: "BUILDING THE FUTURE WITH ", color: "text-gray-300" },
		{ text: "OPEN SOURCE", color: "text-cyan-400" },
		{ text: "...", color: "text-gray-300" }
	]

	const fullText = segments.map(s => s.text).join("")
	const [displayText, setDisplayText] = useState("")
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isStarted, setIsStarted] = useState(false)
	const [showCursor, setShowCursor] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsStarted(true)
		}, startDelay)
		return () => clearTimeout(timer)
	}, [startDelay])

	useEffect(() => {
		if (!isStarted) return

		if (currentIndex < fullText.length) {
			// Add some randomness to make typing feel more natural
			const randomDelay = delay + Math.random() * 60 - 30 // ±30ms variation
			const timer = setTimeout(() => {
				setDisplayText(prev => prev + fullText[currentIndex])
				setCurrentIndex(prev => prev + 1)
			}, randomDelay)
			return () => clearTimeout(timer)
		}
	}, [currentIndex, fullText, delay, isStarted])

	// Blinking cursor effect
	useEffect(() => {
		const isTyping = currentIndex < fullText.length

		if (isTyping) {
			setShowCursor(true)
			return
		}

		const cursorTimer = setInterval(() => {
			setShowCursor(prev => !prev)
		}, 530)

		return () => clearInterval(cursorTimer)
	}, [currentIndex, fullText.length])

	// Function to render text with colors
	const renderColoredText = () => {
		let charCount = 0
		return segments.map((segment, segmentIndex) => {
			const segmentStart = charCount
			charCount += segment.text.length

			const visibleChars = Math.max(0, Math.min(segment.text.length, displayText.length - segmentStart))
			const visibleText = segment.text.substring(0, visibleChars)

			return (
				<span key={segmentIndex} className={segment.color}>
					{visibleText}
				</span>
			)
		})
	}

	return (
		<span>
			{renderColoredText()}
			<span className={`relative inline-block w-[2.5px] h-7 bg-gray-300 align-text-top ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-75`} style={{ bottom: '2px' }}>
			</span>
		</span>
	)
}

const XIcon = ({ className }: { className?: string }) => (
	<svg className={className} viewBox="0 0 24 24" fill="currentColor">
		<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
	</svg>
)

const DiscordIcon = ({ className }: { className?: string }) => (
	<svg className={className} viewBox="0 0 24 24" fill="currentColor">
		<path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
	</svg>
)

export default function Component() {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50)
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	}

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.6,
				ease: "easeOut",
			},
		},
	}

	const glitchVariants = {
		animate: {
			x: [0, -2, 2, 0],
			transition: {
				duration: 0.2,
				repeat: Number.POSITIVE_INFINITY,
				repeatDelay: 3,
			},
		},
	}

	const projects = [
		{
			name: "DermoSkin",
			description: "Cross-platform app for skin care.",
			stars: 23,
			language: "Flutter",
			tech: "Mobile App",
		},
		{
			name: "SolveTask",
			description: "AI agent for Jira platform.",
			stars: 47,
			language: "Python",
			tech: "AI Agent",
		},
		{
			name: "Sealnext.com",
			description: "Website you're looking at right now.",
			stars: 36,
			language: "React",
			tech: "Website",
		},
	]

	const technologies = [
		{
			name: "React",
			description: "Frontend Framework",
			color: "from-blue-400 to-cyan-400",
			icon: "https://cdn.sealnext.com/react.svg",
			url: "https://react.dev/",
		},
		{
			name: "TanStack",
			description: "Data Fetching",
			color: "from-orange-400 to-red-400",
			icon: "https://cdn.sealnext.com/tanstack.webp",
			url: "https://tanstack.com/",
		},
		{
			name: "FastAPI",
			description: "Backend Framework",
			color: "from-green-400 to-emerald-400",
			icon: "https://cdn.sealnext.com/fastapi.svg",
			url: "https://fastapi.tiangolo.com/",
		},
		{
			name: "Docker",
			description: "Containerization",
			color: "from-blue-500 to-blue-600",
			icon: "https://cdn.sealnext.com/docker.svg",
			url: "https://www.docker.com/",
		},
		{
			name: "TypeScript",
			description: "Type Safety",
			color: "from-blue-400 to-blue-500",
			icon: "https://cdn.sealnext.com/typescript.svg",
			url: "https://www.typescriptlang.org/",
		},
		{
			name: "PostgreSQL",
			description: "Database",
			color: "from-blue-600 to-indigo-600",
			icon: "https://cdn.sealnext.com/postgres.svg",
			url: "https://www.postgresql.org/",
		},
		{
			name: "Redis",
			description: "Caching",
			color: "from-red-500 to-red-600",
			icon: "https://cdn.sealnext.com/redis.svg",
			url: "https://redis.io/",
		},
		{
			name: "Kubernetes",
			description: "Orchestration",
			color: "from-blue-500 to-purple-500",
			icon: "https://cdn.sealnext.com/kubernetes.svg",
			url: "https://kubernetes.io/",
		},
	]

	const team = [
		{
			name: "Andrei Badescu",
			role: "Co-Founder & CEO",
			specialization: "Full-Stack & DevOps",
			experience: "5+ Years",
			skills: ["Full-Stack", "DevOps", "AI", "Cybersecurity"],
			github: "andreibadescu",
			linkedin: "andreibadescu",
			x: "andreibadescu_",
			link: "https://andreibadescu.com",
			picture: "https://cdn.andreibadescu.com/profile.webp"
		},
		{
			name: "Ovidiu Bachmatchi",
			role: "Co-Founder & CTO",
			specialization: "Full-Stack & AI",
			experience: "6+ Years",
			skills: ["Backend", "AI", "UI/UX", "Product Strategy"],
			github: "ovidiubachmatchi",
			linkedin: "ovidiubachmatchi",
			x: "andreibadescu_",
			link: "https://ovidiubachmatchi.com",
		},
	]

	return (
		<div className="min-h-screen bg-black text-white relative overflow-hidden">
			<ScrollOverlay />
			{/* Animated Background Grid */}
			<div className="fixed inset-0 z-0 -left-10">
				<div className="absolute inset-0 bg-gray-900" />
				<div
					className="absolute inset-0 opacity-25"
					style={{
						backgroundImage: `
							linear-gradient(rgba(0, 255, 255, 0.2) 2px, transparent 2px),
							linear-gradient(90deg, rgba(0, 255, 255, 0.2) 2px, transparent 2px)
						`,
						backgroundSize: "50px 50px",
						// animation: "grid-move 1s linear infinite",
					}}
				/>
			</div>



			{/* Floating Star Particles */}
			<div className="absolute top-0 left-0 w-full min-h-full z-15 pointer-events-none" style={{ height: '200vh' }}>
				{[...Array(120)].map((_, i) => {
					const size = Math.random() * 3 + 2; // 2-5px
					const startX = Math.random() * 100;
					const startY = Math.random() * 100;
					const drift = (Math.random() - 0.5) * 80; // more horizontal drift
					const isUpward = Math.random() > 0.15; // 85% go up, 15% float around

					return (
						<motion.div
							key={i}
							className="absolute"
							style={{
								width: `${size}px`,
								height: `${size}px`,
							}}
							initial={{
								left: `${startX}%`,
								top: `${startY}%`,
							}}
							animate={isUpward ? {
								y: [0, -window.innerHeight - 150],
								x: [0, drift],
								opacity: [0, 0.7, 1, 0.7, 0],
							} : {
								y: [0, (Math.random() - 0.5) * 400, (Math.random() - 0.5) * 600],
								x: [0, (Math.random() - 0.5) * 300, (Math.random() - 0.5) * 200],
								opacity: [0, 0.8, 0.9, 0.6, 0.8, 0],
							}}
							transition={{
								duration: isUpward ? 8 + Math.random() * 6 : 10 + Math.random() * 8,
								repeat: Number.POSITIVE_INFINITY,
								delay: Math.random() * 6,
								ease: [0.25, 0.46, 0.45, 0.94],
							}}
						>
							{/* Star shape with multiple points */}
							<motion.div
								className="relative w-full h-full"
								animate={{
									rotate: [0, 360],
									scale: [0.8, 1.2, 0.8],
								}}
								transition={{
									rotate: { duration: 8 + Math.random() * 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
									scale: { duration: 2 + Math.random() * 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
								}}
							>
								{/* Central bright core */}
								<div
									className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full"
									style={{
										width: `${size * 0.3}px`,
										height: `${size * 0.3}px`,
										boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, 0.8), 0 0 ${size * 4}px rgba(34, 211, 238, 0.6)`
									}}
								/>
								{/* Star rays */}
								<div
									className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cyan-400"
									style={{
										width: `${size}px`,
										height: `${size * 0.15}px`,
										boxShadow: `0 0 ${size}px rgba(34, 211, 238, 0.8)`
									}}
								/>
								<div
									className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cyan-400 rotate-90"
									style={{
										width: `${size}px`,
										height: `${size * 0.15}px`,
										boxShadow: `0 0 ${size}px rgba(34, 211, 238, 0.8)`
									}}
								/>
								<div
									className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cyan-300 rotate-45"
									style={{
										width: `${size * 0.7}px`,
										height: `${size * 0.1}px`,
										boxShadow: `0 0 ${size * 0.7}px rgba(34, 211, 238, 0.6)`
									}}
								/>
								<div
									className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cyan-300 -rotate-45"
									style={{
										width: `${size * 0.7}px`,
										height: `${size * 0.1}px`,
										boxShadow: `0 0 ${size * 0.7}px rgba(34, 211, 238, 0.6)`
									}}
								/>
							</motion.div>
						</motion.div>
					);
				})}
			</div>

			<div className="relative z-20">
				{/* Header */}
				<motion.header
					className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-all duration-300 ${
						isScrolled ? "bg-black/80 border-cyan-500/20" : "bg-transparent border-transparent"
					}`}
					initial={{ y: -100 }}
					animate={{ y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<div className="container mx-auto px-4 h-14 flex items-center">
						{/* Desktop Layout */}
						<div className="hidden md:contents">
							<div className="w-36">
								<motion.div
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.6 }}
									className="flex items-center space-x-2"
								>
									<a href="https://sealnext.com">
										<img
											src="https://cdn.sealnext.com/logo-full.svg"
											alt="Sealnext Logo"
											className="h-8 w-auto [filter:brightness(0)_saturate(100%)_invert(86%)_sepia(6%)_saturate(151%)_hue-rotate(169deg)_brightness(95%)_contrast(90%)] hover:[filter:brightness(0)_saturate(100%)_invert(74%)_sepia(80%)_saturate(3207%)_hue-rotate(177deg)_brightness(103%)_contrast(101%)] transition-all duration-300"
											draggable="false"
										/>
									</a>
								</motion.div>
							</div>

							<nav className="flex-1 flex justify-center">
								<div className="flex items-center space-x-8">
									<a
										href="#architecture"
										className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
									>
										Architecture
									</a>
									<a
										href="#projects"
										className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
									>
										Projects
									</a>
									<a
										href="#team"
										className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
									>
										Team
									</a>
								</div>
							</nav>

							<div className="w-36 flex justify-end">
								<Button
									variant="outline"
									size="sm"
									asChild
									className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 bg-transparent transition-colors hover:!text-white"
								>
									<a href="https://github.com/sealnext" className="flex items-center space-x-0">
										<Github className="h-4 w-4" />
										<span>GitHub</span>
									</a>
								</Button>
							</div>
						</div>

						{/* Mobile Layout */}
						<div className="md:hidden flex items-center justify-between w-full">
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6 }}
								className="flex items-center space-x-2"
							>
								<a href="https://sealnext.com">
									<img
										src="https://cdn.sealnext.com/logo-full.svg"
										alt="Sealnext Logo"
										className="h-6 w-auto [filter:brightness(0)_saturate(100%)_invert(86%)_sepia(6%)_saturate(151%)_hue-rotate(169deg)_brightness(95%)_contrast(90%)] hover:[filter:brightness(0)_saturate(100%)_invert(74%)_sepia(80%)_saturate(3207%)_hue-rotate(177deg)_brightness(103%)_contrast(101%)] transition-all duration-300"
										draggable="false"
									/>
								</a>
							</motion.div>

							<div className="flex items-center space-x-3">
								<Button
									variant="outline"
									size="lg"
									className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 bg-transparent hover:text-white px-2 py-0.5"
								>
									<a href="https://github.com/sealnext" target="_blank" rel="noopener noreferrer">
										<Github className="size-6 relative left-[1px]" />
									</a>
								</Button>

								<Button
									variant="ghost"
									size="lg"
									onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
									className="text-cyan-400 hover:bg-cyan-500/10 hover:text-white p-2"
								>
									<motion.div
										animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
										transition={{ duration: 0.3 }}
									>
										{isMobileMenuOpen ? (
											<svg style={{ width: '28px', height: '28px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
											</svg>
										) : (
											<svg style={{ width: '28px', height: '28px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M4 6h16M4 12h16M4 18h16"
												/>
											</svg>
										)}
									</motion.div>
								</Button>
							</div>
						</div>
					</div>

					{/* Mobile Menu Dropdown */}
					<motion.div
						className="md:hidden"
						initial={false}
						animate={isMobileMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						style={{ overflow: "hidden" }}
					>
						<div className="bg-black/95 backdrop-blur-md border-t border-cyan-500/20">
							<nav className="container mx-auto px-4 py-4">
								<div className="flex flex-col space-y-5">
									<a
										href="#systems"
										onClick={() => setIsMobileMenuOpen(false)}
										className="text-lg font-medium text-gray-300 hover:text-cyan-400 transition-colors py-1 border-b border-gray-800 hover:border-cyan-500/30"
									>
										Systems
									</a>
									<a
										href="#projects"
										onClick={() => setIsMobileMenuOpen(false)}
										className="text-lg font-medium text-gray-300 hover:text-cyan-400 transition-colors py-1 border-b border-gray-800 hover:border-cyan-500/30"
									>
										Projects
									</a>
									<a
										href="#team"
										onClick={() => setIsMobileMenuOpen(false)}
										className="text-lg font-medium text-gray-300 hover:text-cyan-400 transition-colors py-1 border-b border-gray-800 hover:border-cyan-500/30"
									>
										Team
									</a>
								</div>
							</nav>
						</div>
					</motion.div>
				</motion.header>

				{/* Hero Section */}
				<section
					className="pt-28 pb-32 px-4 relative"
					style={{
						backgroundImage: `url('https://cdn.sealnext.com/earth-surface.webp')`,
						backgroundSize: 'cover',
						backgroundPosition: 'center center',
						backgroundRepeat: 'no-repeat',
						backgroundAttachment: 'fixed'
					}}
				>
					{/* Dark overlay for better text readability */}
					<div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-0" />
					{/* Bottom gradient for smooth section transition */}
					<div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent z-10" />
					{/* Hero Section Star Particles */}
					<div className="absolute inset-0 z-10 pointer-events-none">
						{[...Array(35)].map((_, i) => {
							const size = Math.random() * 3 + 2; // 2-5px
							const startX = Math.random() * 100;
							const startY = Math.random() * 100;
							const drift = (Math.random() - 0.5) * 80;
							const isUpward = Math.random() > 0.15;

							return (
								<motion.div
									key={`hero-${i}`}
									className="absolute"
									style={{
										width: `${size}px`,
										height: `${size}px`,
									}}
									initial={{
										left: `${startX}%`,
										top: `${startY}%`,
									}}
									animate={isUpward ? {
										y: [0, -600],
										x: [0, drift],
										opacity: [0, 0.7, 1, 0.7, 0],
									} : {
										y: [0, (Math.random() - 0.5) * 300, (Math.random() - 0.5) * 400],
										x: [0, (Math.random() - 0.5) * 250, (Math.random() - 0.5) * 180],
										opacity: [0, 0.8, 0.9, 0.6, 0.8, 0],
									}}
									transition={{
										duration: isUpward ? 8 + Math.random() * 6 : 10 + Math.random() * 8,
										repeat: Number.POSITIVE_INFINITY,
										delay: Math.random() * 6,
										ease: [0.25, 0.46, 0.45, 0.94],
									}}
								>
									{/* Star shape */}
									<motion.div
										className="relative w-full h-full"
										animate={{
											rotate: [0, 360],
											scale: [0.8, 1.2, 0.8],
										}}
										transition={{
											rotate: { duration: 8 + Math.random() * 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
											scale: { duration: 2 + Math.random() * 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
										}}
									>
										{/* Central bright core */}
										<div
											className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full"
											style={{
												width: `${size * 0.3}px`,
												height: `${size * 0.3}px`,
												boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, 0.8), 0 0 ${size * 4}px rgba(34, 211, 238, 0.6)`
											}}
										/>
										{/* Star rays */}
										<div
											className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cyan-400"
											style={{
												width: `${size}px`,
												height: `${size * 0.15}px`,
												boxShadow: `0 0 ${size}px rgba(34, 211, 238, 0.8)`
											}}
										/>
										<div
											className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cyan-400 rotate-90"
											style={{
												width: `${size}px`,
												height: `${size * 0.15}px`,
												boxShadow: `0 0 ${size}px rgba(34, 211, 238, 0.8)`
											}}
										/>
										<div
											className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cyan-300 rotate-45"
											style={{
												width: `${size * 0.7}px`,
												height: `${size * 0.1}px`,
												boxShadow: `0 0 ${size * 0.7}px rgba(34, 211, 238, 0.6)`
											}}
										/>
										<div
											className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cyan-300 -rotate-45"
											style={{
												width: `${size * 0.7}px`,
												height: `${size * 0.1}px`,
												boxShadow: `0 0 ${size * 0.7}px rgba(34, 211, 238, 0.6)`
											}}
										/>
									</motion.div>
								</motion.div>
							);
						})}
					</div>
					<div className="container mx-auto text-center relative z-20">
						<motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-6xl mx-auto">
							<motion.div variants={itemVariants} className="mb-8">
								<motion.div variants={glitchVariants} animate="animate" className="inline-block mb-8 relative">
									<div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full" />
									<img
										src="https://cdn.sealnext.com/logo.svg"
										alt="Sealnext"
										width={100}
										height={100}
										className="mx-auto brightness-0 invert relative z-10"
										draggable="false"
									/>
									<div className="absolute inset-0 border border-cyan-400/30 rounded-full animate-pulse" />
								</motion.div>

								<motion.div
									className="mb-6 relative"
									variants={glitchVariants}
									animate="animate"
								>
									<div
										className="mx-auto h-20 w-auto relative z-10"
										style={{
											background: 'linear-gradient(45deg, #00ffff, #0066ff, #00f0ff)',
											maskImage: 'url(https://cdn.sealnext.com/logo-full.svg)',
											WebkitMaskImage: 'url(https://cdn.sealnext.com/logo-full.svg)',
											maskRepeat: 'no-repeat',
											WebkitMaskRepeat: 'no-repeat',
											maskSize: 'contain',
											WebkitMaskSize: 'contain',
											maskPosition: 'center',
											WebkitMaskPosition: 'center'
										}}
									/>
									<div className="absolute inset-0 opacity-50 blur-sm">
										<div
											className="mx-auto h-20 w-auto"
											style={{
												background: 'linear-gradient(45deg, #00ffff, #0066ff, #00f0ff)',
												maskImage: 'url(https://cdn.sealnext.com/logo-full.svg)',
												WebkitMaskImage: 'url(https://cdn.sealnext.com/logo-full.svg)',
												maskRepeat: 'no-repeat',
												WebkitMaskRepeat: 'no-repeat',
												maskSize: 'contain',
												WebkitMaskSize: 'contain',
												maskPosition: 'center',
												WebkitMaskPosition: 'center'
											}}
										/>
									</div>
								</motion.div>

								<div className="relative mb-8">
									<p className="text-xl md:text-2xl text-gray-300 mb-4 font-mono">
										{">"}<ColoredTypewriterText />
									</p>
								</div>
							</motion.div>

							<motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
								<Button
									size="lg"
									className="text-lg px-[42px] py-[26px] bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold transform hover:scale-105 transition-all duration-300"
									asChild
								>
									<a href="https://github.com/sealnext" target="_blank" rel="noopener noreferrer">
										<Rocket className="size-6" />
										VIEW PRODUCTS
									</a>
								</Button>
								<Button
									size="lg"
									className="text-lg px-10 py-6 border-2 border-cyan-500 !text-cyan-400 hover:!text-white hover:bg-cyan-500/10 hover:border-cyan-400 font-bold transform hover:scale-105 transition-all duration-300 bg-transparent"
									asChild
								>
									<a href="https://github.com/orgs/sealnext/repositories" className="flex items-center space-x-0 !text-cyan-400 hover:!text-white">
										<Github className="size-6" />
										<span>VIEW SOURCE</span>
									</a>
								</Button>
							</motion.div>

							<motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
								{[
									{
										icon: Heart,
										title: "FREE FOREVER",
										desc: "MIT licensed • Use as you like • No restrictions",
										bgColor: "bg-red-500/20",
										hoverBgColor: "group-hover:bg-red-500/30",
										iconColor: "text-red-400",
									},
									{
										icon: Globe,
										title: "OPEN SOURCE",
										desc: "100% transparent • Community driven • Public repos",
										bgColor: "bg-green-500/20",
										hoverBgColor: "group-hover:bg-green-500/30",
										iconColor: "text-green-400",
									},
									{
										icon: Lock,
										title: "SECURE",
										desc: "Daily security scans • Automated testing • Zero vulnerabilities",
										bgColor: "bg-cyan-500/20",
										hoverBgColor: "group-hover:bg-cyan-500/30",
										iconColor: "text-cyan-400",
									},
								].map((item, index) => (
									<motion.div
										key={index}
										whileHover={{ scale: 1.05, y: -10 }}
										transition={{ type: "spring", stiffness: 300 }}
										className="relative group"
									>
										<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-xl rounded-lg group-hover:blur-2xl transition-all duration-300" />
										<div className="relative bg-gray-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-8 group-hover:border-cyan-400 transition-all duration-300 h-full flex flex-col justify-center">
											<div
												className={`${item.bgColor} ${item.hoverBgColor} rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-6 transition-all duration-300`}
											>
												<item.icon className={`h-8 w-8 ${item.iconColor}`} />
											</div>
											<h3 className="text-xl font-black mb-3 text-white">{item.title}</h3>
											<p className="text-gray-400 font-mono text-sm leading-relaxed">{item.desc}</p>
										</div>
									</motion.div>
								))}
							</motion.div>
						</motion.div>
					</div>
				</section>

				{/* Tech Specs Section */}
				<section id="architecture" className="py-20 px-4 relative">
					<div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-transparent" />
					<div className="container mx-auto relative">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="text-center mb-16"
						>
							<h2 className="text-5xl font-black mb-6 text-white">
								<span className="text-cyan-400">SYSTEM</span> ARCHITECTURE
							</h2>
							<p className="text-xl text-gray-300 max-w-4xl mx-auto font-mono">
								{">"} Software engineered for maximum performance and security
							</p>
						</motion.div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{[
								{ icon: Code, title: "OPEN SOURCE", desc: "100% transparent codebase", metric: "∞" },
								{ icon: Shield, title: "SECURE", desc: "Zero-trust architecture", metric: "256-bit" },
								{ icon: Zap, title: "PERFORMANCE", desc: "Quantum-optimized algorithms", metric: "99.9%" },
								{ icon: Users, title: "DISTRIBUTED", desc: "Global developer network", metric: "24/7" },
							].map((item, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
									whileHover={{ y: -5 }}
									className="group"
								>
									<Card className="h-full bg-gray-900/30 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/25">
										<CardContent className="p-6 text-center">
											<div className="bg-cyan-500/10 rounded-lg w-12 h-12 flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-500/20 transition-all duration-300">
												<item.icon className="h-8 w-8 text-cyan-400" />
											</div>
											<div className="text-2xl font-black text-cyan-400 mb-2">{item.metric}</div>
											<h3 className="font-black mb-2 text-white">{item.title}</h3>
											<p className="text-sm text-gray-400 font-mono">{item.desc}</p>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Projects Section */}
				<section id="projects" className="py-20 px-4">
					<div className="container mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="text-center mb-16"
						>
							<h2 className="text-5xl font-black mb-6 text-white">
								<span className="text-cyan-400">ACTIVE</span> PROJECTS
							</h2>
							<p className="text-xl text-gray-300 max-w-4xl mx-auto font-mono">
								{">"} Powering the next generation of technology
							</p>
						</motion.div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{projects.map((project, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
									whileHover={{ y: -10, scale: 1.02 }}
									className="group"
								>
									<Card className="h-full bg-gray-900/30 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-cyan-500/25 relative overflow-hidden">
										<div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
										<CardContent className="p-6 relative">
											<div className="flex items-start justify-between mb-4">
												<div>
													<h3 className="text-xl font-black group-hover:text-cyan-400 transition-colors text-white mb-1">
														{project.name}
													</h3>
													<div className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded inline-block">
														{project.tech}
													</div>
												</div>
												<ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
											</div>
											<p className="text-gray-300 mb-6 font-mono text-sm leading-relaxed">{project.description}</p>
											<div className="flex items-center justify-between text-sm">
												<div className="flex items-center space-x-2">
													<Star className="h-4 w-4 text-yellow-400" />
													<span className="text-white font-bold">{project.stars.toLocaleString()}</span>
												</div>
												<div className="flex items-center space-x-2">
													<div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
													<span className="text-gray-400 font-mono">{project.language}</span>
												</div>
											</div>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							viewport={{ once: true }}
							className="text-center mt-12"
						>
							<Button
								variant="outline"
								size="lg"
								asChild
								className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 font-bold transform hover:scale-105 transition-all duration-300 bg-transparent"
							>
								<a href="https://github.com/sealnext" className="flex items-center space-x-0 hover:text-white">
									<Github className="h-5 w-5" />
									<span>ACCESS ALL SYSTEMS</span>
								</a>
							</Button>
						</motion.div>
					</div>
				</section>

				{/* Tech Stack Section */}
				<section className="py-20 px-4 relative">
					<div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/20 to-transparent" />
					<div className="container mx-auto relative">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="text-center mb-16"
						>
							<h2 className="text-5xl font-black mb-6 text-white">
								<span className="text-cyan-400">POWERED</span> BY
							</h2>
							<p className="text-xl text-gray-300 max-w-4xl mx-auto font-mono">
								{">"} Modern technologies driving our ecosystem
							</p>
						</motion.div>

						<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
							{technologies.map((tech, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, scale: 0.8 }}
									whileInView={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
									whileHover={{ scale: 1.05, y: -5 }}
									className="group"
								>
									<a href={tech.url} target="_blank" rel="noopener noreferrer" className="block">
										<Card className="bg-gray-900/30 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/25 relative overflow-hidden cursor-pointer">
											<div
												className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
											/>
											<CardContent className="p-6 text-center relative">
												<div
													className={`mx-auto mb-4 flex items-center justify-center`}
												>
													<img
														src={tech.icon}
														alt={tech.name}
														className="w-20 h-20 object-contain"
													/>
												</div>
												<h3 className="font-black text-white group-hover:text-cyan-400 transition-colors mb-1">
													{tech.name}
												</h3>
												<p className="text-xs text-gray-400 font-mono">{tech.description}</p>
											</CardContent>
										</Card>
									</a>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Team Section */}
				<section id="team" className="py-20 px-4">
					<div className="container mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="text-center mb-16"
						>
							<h2 className="text-5xl font-black mb-6 text-white">
								<span className="text-cyan-400">CORE</span> TEAM
							</h2>
							<p className="text-xl text-gray-300 max-w-4xl mx-auto font-mono">
								{">"} Elite engineers architecting the future of software
							</p>
						</motion.div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
							{team.map((member, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.2 }}
									viewport={{ once: true }}
									whileHover={{ y: -10 }}
									className="group"
								>
									<a href={member.link} target="_blank" rel="noopener" className="cursor-pointer">
										<Card className="bg-gray-900/30 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-cyan-500/25 relative overflow-hidden">
											<div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
											<CardContent className="px-8 py-6 relative">
												<div className="text-center mb-8">
													<div className="w-60 h-60 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg  overflow-hidden mx-auto mb-6 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
													 {member.picture ? (
														<img src={member.picture} alt={member.name} className="object-cover w-full h-full" />
													 ) : (
														<User className="h-12 w-12 text-cyan-400" />
													 )}
													</div>
													<h3 className="text-2xl font-black text-white mb-1 group-hover:text-cyan-400 transition-colors">
														{member.name}
													</h3>
													<p className="text-cyan-400 font-mono text-sm mb-2">{member.role}</p>
													<div className="flex items-center justify-center space-x-4 text-xs text-gray-400 font-mono">
														<span>{member.specialization}</span>
														<span>•</span>
														<span>{member.experience}</span>
													</div>
												</div>

												<div className="mb-8">
													<h4 className="text-sm font-black text-white mb-3">CORE EXPERTISE</h4>
													<div className="grid grid-cols-2 gap-2">
														{member.skills.map((skill, skillIndex) => (
															<div
																key={skillIndex}
																className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded text-center"
															>
																{skill}
															</div>
														))}
													</div>
												</div>

												<div className="flex justify-center space-x-3">
													<Button
														variant="outline"
														size="sm"
														asChild
														className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 bg-transparent"
													>
														<a href={`https://github.com/${member.github}`} className="flex items-center space-x-0 hover:text-white" target="_blank" rel="noopener noreferrer">
															<Github className="h-4 w-4" />
															<span>GitHub</span>
														</a>
													</Button>
													<Button
														variant="outline"
														size="sm"
														asChild
														className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 bg-transparent"
													>
														<a
															href={`https://linkedin.com/in/${member.linkedin}`}
															className="flex items-center space-x-0 hover:text-white"
															target="_blank"
															rel="noopener noreferrer"
														>
															<Linkedin className="h-4 w-4" />
															<span>LinkedIn</span>
														</a>
													</Button>
													<Button
														variant="outline"
														size="sm"
														asChild
														className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 bg-transparent"
													>
														<a href={`https://x.com/${member.x}`} className="flex items-center space-x-0 hover:text-white" target="_blank" rel="noopener noreferrer">
															<XIcon className="h-4 w-4" />
															<span>X</span>
														</a>
													</Button>
												</div>
											</CardContent>
										</Card>
									</a>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-20 px-4 relative">
					<div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent" />
					<div className="container mx-auto text-center relative">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
						>
							<h2 className="text-5xl font-black mb-6 text-white">
								<span className="text-cyan-400">JOIN</span> THE NETWORK
							</h2>
							<p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto font-mono">
								{">"} Connect with developers building the technology of tomorrow
							</p>
							<div className="flex flex-col sm:flex-row gap-6 justify-center">
								<Button
									size="lg"
									asChild
									className="text-lg px-10 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 !text-cyan-100 hover:!text-white font-bold transform hover:scale-105 transition-all duration-300"
								>
									<a href="mailto:hi@sealnext.com" className="flex items-center" target="_blank" rel="noopener noreferrer">
										<Terminal className="size-6" />
										<span>START CONTRIBUTING</span>
									</a>
								</Button>
								<Button
									variant="outline"
									size="lg"
									asChild
									className="text-lg px-10 py-6 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 font-bold transform hover:scale-105 transition-all duration-300 bg-transparent hover:!text-white"
								>
									<a href="https://discord.gg/CebnAd7UWb" className="flex items-center" target="_blank" rel="noopener noreferrer">
										<DiscordIcon className="size-6" />
										<span>ENTER DISCORD</span>
									</a>
								</Button>
							</div>
						</motion.div>
					</div>
				</section>

				{/* Footer */}
				<footer className="relative bg-black border-t border-cyan-500/20">
					{/* Background Effects */}
					<div className="absolute inset-0">
						<div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/50 to-transparent" />
						<div
							className="absolute inset-0 opacity-10"
							style={{
								backgroundImage: `
									linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
									linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px)
								`,
								backgroundSize: "30px 30px",
							}}
						/>
					</div>

					<div className="relative z-10">
						{/* Main Footer Content */}
						<div className="container mx-auto px-4 py-16">
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
								{/* Company Info */}
								<div className="lg:col-span-2">
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6 }}
										viewport={{ once: true }}
									>
										<div className="flex items-center space-x-3 mb-6">
											<img
												src="https://cdn.sealnext.com/logo-full.svg"
												alt="Sealnext"
												width={200}
												className="brightness-0 invert"
												draggable="false"
											/>
											<span className="text-cyan-400 font-mono text-sm bg-cyan-500/10 px-2 py-1 rounded">v1.0</span>
										</div>
										<p className="text-gray-300 mb-6 max-w-md leading-relaxed font-mono text-sm">
											{">"} Building the future with open source technology. All our projects are free, secure, and MIT
											licensed. Join thousands of developers using our tools worldwide.
										</p>
										<div className="flex items-center space-x-4">
											<div className="flex items-center space-x-2 text-sm text-gray-400">
												<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
												<span className="font-mono">All systems operational</span>
											</div>
										</div>
									</motion.div>
								</div>

								{/* Quick Links */}
								<div>
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: 0.1 }}
										viewport={{ once: true }}
									>
										<h3 className="text-white font-black mb-6 text-lg">QUICK ACCESS</h3>
										<ul className="space-y-3">
											{[
												{ name: "Website Changelog", href: "https://github.com/sealnext/sealnext.com/commits/main/" },
												{ name: "Getting Started", href: "https://github.com/orgs/sealnext/repositories" },
												{ name: "Contact", href: "mailto:hi@sealnext.com" },
											].map((link, index) => (
												<li key={index}>
													<a
														href={link.href}
														className="text-gray-400 hover:text-cyan-400 transition-colors font-mono text-sm flex items-center space-x-2 group"
													>
														<span className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity">
															{">"}
														</span>
														<span>{link.name}</span>
													</a>
												</li>
											))}
										</ul>
									</motion.div>
								</div>

								{/* Community */}
								<div>
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: 0.2 }}
										viewport={{ once: true }}
									>
										<h3 className="text-white font-black mb-6 text-lg">COMMUNITY</h3>
										<ul className="space-y-3">
											{[
												{ name: "GitHub", href: "https://github.com/sealnext", icon: Github },
												{ name: "Discord", href: "https://discord.gg/CebnAd7UWb", icon: DiscordIcon },
												{ name: "LinkedIn", href: "https://www.linkedin.com/company/sealnext", icon: Linkedin },
											].map((link, index) => (
												<li key={index}>
													<a
														href={link.href}
														className="text-gray-400 hover:text-cyan-400 transition-colors font-mono text-sm flex items-center space-x-3 group"
													>
														<link.icon className="h-4 w-4 group-hover:text-cyan-400 transition-colors" />
														<span>{link.name}</span>
													</a>
												</li>
											))}
										</ul>
									</motion.div>
								</div>
							</div>

							{/* Stats Section */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.3 }}
								viewport={{ once: true }}
								className="mt-16 pt-8 border-t border-cyan-500/20"
							>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
									{[
										{ label: "GitHub Stars", value: "1K+", icon: Star },
										{ label: "Contributors", value: "5+", icon: Users },
										{ label: "Projects", value: "10+", icon: Code },
										{ label: "Downloads", value: "100+", icon: Download },
									].map((stat, index) => (
										<div key={index} className="text-center group">
											<div className="flex items-center justify-center mb-2">
												<stat.icon className="h-5 w-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
											</div>
											<div className="text-2xl font-black text-white mb-1">{stat.value}</div>
											<div className="text-xs text-gray-400 font-mono">{stat.label}</div>
										</div>
									))}
								</div>
							</motion.div>
						</div>

						{/* Bottom Bar */}
						<div className="border-t border-cyan-500/20 bg-black/50">
							<div className="container mx-auto px-4 py-6">
								<div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
									<div className="flex items-center space-x-6">
										<span className="text-sm text-gray-400 font-mono">
											© {new Date().getFullYear()} SEALNEXT
										</span>
										<div className="flex items-center space-x-4">
											<a href="https://en.wikipedia.org/wiki/MIT_License" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-cyan-400 transition-colors font-mono">
												MIT License
											</a>
											<a href="#" className="text-xs text-gray-500 hover:text-cyan-400 transition-colors font-mono">
												Privacy
											</a>
											<a href="#" className="text-xs text-gray-500 hover:text-cyan-400 transition-colors font-mono">
												Terms
											</a>
										</div>
									</div>

									<div className="flex items-center space-x-4">
										<span className="text-xs text-gray-500 font-mono">Built with</span>
										<div className="flex items-center space-x-2">
											{["React", "Vite", "Shadcn", "Tailwind"].map((tech, index) => (
												<span key={index} className="text-xs bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded font-mono">
													{tech}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</footer>
			</div>
		</div>
	)
}
