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

const ReactIcon = ({ className }: { className?: string }) => (
	<svg className={className} viewBox="0 0 24 24" fill="currentColor">
		<path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.014 1.36-.034-.44.572-.895 1.095-1.36 1.56-.465-.467-.92-.992-1.36-1.56z" />
	</svg>
)

const TanStackIcon = ({ className }: { className?: string }) => (
	<svg className={className} viewBox="0 0 24 24" fill="currentColor">
		<path d="M12 0L2.524 4.5v15L12 24l9.476-4.5v-15L12 0zm0 2.292l7.476 3.554v11.308L12 21.708l-7.476-3.554V5.846L12 2.292zM8.5 7.5v9l3.5-1.75L15.5 16.5v-9L12 9.25 8.5 7.5z" />
	</svg>
)

const FastAPIIcon = ({ className }: { className?: string }) => (
	<svg className={className} viewBox="0 0 24 24" fill="currentColor">
		<path d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm0 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25zM8.5 6.5l3.5 7 3.5-7h2l-5.5 11L6 6.5h2.5z" />
	</svg>
)

const DockerIcon = ({ className }: { className?: string }) => (
	<svg className={className} viewBox="0 0 24 24" fill="currentColor">
		<path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338 0-.676.033-1.01.099-.663-1.865-2.608-2.526-2.663-2.526l-.343-.133-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
	</svg>
)

const TypeScriptIcon = ({ className }: { className?: string }) => (
	<svg className={className} viewBox="0 0 24 24" fill="currentColor">
		<path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
	</svg>
)

const PostgreSQLIcon = ({ className }: { className?: string }) => (
	<svg className={className} viewBox="0 0 24 24" fill="currentColor">
		<path d="M23.111 5.866c-.72-2.267-2.167-3.34-3.267-3.34-.267 0-.533.067-.8.2-1.067.533-1.6 1.733-1.6 3.6 0 .533.067 1.133.2 1.8.133.667.267 1.4.267 2.133 0 .8-.2 1.533-.533 2.2-.4.8-.933 1.467-1.533 2-.667.6-1.4 1.067-2.2 1.333-.8.267-1.667.4-2.533.4-.867 0-1.733-.133-2.533-.4-.8-.267-1.533-.733-2.2-1.333-.6-.533-1.133-1.2-1.533-2-.333-.667-.533-1.4-.533-2.2 0-.733.133-1.467.267-2.133.133-.667.2-1.267.2-1.8 0-1.867-.533-3.067-1.6-3.6-.267-.133-.533-.2-.8-.2-1.1 0-2.547 1.073-3.267 3.34C.044 6.599 0 7.399 0 8.199c0 1.6.267 3.133.8 4.533.533 1.4 1.267 2.667 2.2 3.733.933 1.067 2.067 1.933 3.333 2.6 1.267.667 2.667 1 4.133 1 .533 0 1.067-.067 1.6-.2.533-.133 1.067-.333 1.533-.6.467-.267.933-.6 1.333-1 .4-.4.733-.867 1-1.4.267-.533.4-1.133.4-1.733 0-.6-.133-1.2-.4-1.733-.267-.533-.6-1-.933-1.4-.333-.4-.733-.733-1.133-1-.4-.267-.8-.467-1.2-.6-.4-.133-.8-.2-1.2-.2-.4 0-.8.067-1.2.2-.4.133-.8.333-1.2.6-.4.267-.733.6-1.133 1-.333.4-.667.867-.933 1.4-.267.533-.4 1.133-.4 1.733 0 .6.133 1.2.4 1.733.267.533.6 1 1 1.4.4.4.867.733 1.333 1 .467.267 1 .467 1.533.6.533.133 1.067.2 1.6.2 1.467 0 2.867-.333 4.133-1 1.267-.667 2.4-1.533 3.333-2.6.933-1.067 1.667-2.333 2.2-3.733.533-1.4.8-2.933.8-4.533 0-.8-.044-1.6-.089-2.333z" />
	</svg>
)

const RedisIcon = ({ className }: { className?: string }) => (
	<svg className={className} viewBox="0 0 24 24" fill="currentColor">
		<path d="M10.5 2.661l.54.997-1.797.644-.54-.997L10.5 2.661zm2.077.702l.54.997-1.797.644-.54-.997 1.797-.644zm2.077.702l.54.997-1.797.644-.54-.997 1.797-.644zm2.077.702l.54.997-1.797.644-.54-.997L16.731 4.767zM24 8.349c0 .644-.715 1.183-1.664 1.488-.715.233-1.621.364-2.706.364-1.085 0-1.991-.131-2.706-.364C16.715 9.532 16 8.993 16 8.349c0-.644.715-1.183 1.924-1.488.715-.233 1.621-.364 2.706-.364 1.085 0 1.991.131 2.706.364C23.285 7.166 24 7.705 24 8.349zm-8 0c0 .644-.715 1.183-1.664 1.488-.715.233-1.621.364-2.706.364-1.085 0-1.991-.131-2.706-.364C8.715 9.532 8 8.993 8 8.349c0-.644.715-1.183 1.924-1.488.715-.233 1.621-.364 2.706-.364 1.085 0 1.991.131 2.706.364C15.285 7.166 16 7.705 16 8.349zm-8 0c0 .644-.715 1.183-1.664 1.488C5.621 10.07 4.715 10.201 3.63 10.201c-1.085 0-1.991-.131-2.706-.364C.715 9.532 0 8.993 0 8.349c0-.644.715-1.183 1.924-1.488C2.639 6.628 3.545 6.497 4.63 6.497c1.085 0 1.991.131 2.706.364C8.285 7.166 9 7.705 9 8.349z" />
	</svg>
)

const KubernetesIcon = ({ className }: { className?: string }) => (
	<svg className={className} viewBox="0 0 24 24" fill="currentColor">
		<path d="M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005a.44.44 0 0 1 .484.606zm-.833-2.129a.44.44 0 0 1 .173-.756l.002-.011 2.456-1.051a5.156 5.156 0 0 1 .309 2.98l-2.581.438-.008-.002a.44.44 0 0 1-.351-.598zm3.717-2.083l.006-.003a.44.44 0 0 1 .81.164v.003l.38 2.65a5.156 5.156 0 0 1-2.788 1.943l-1.051-2.456-.002-.002a.44.44 0 0 1 .645-.299zm2.876 2.487l.002.001a.44.44 0 0 1-.207.747l-.005.001-2.65.38a5.156 5.156 0 0 1-1.943-2.788l2.456-1.051.002-.002a.44.44 0 0 1 .345.712zm1.672 2.04a.44.44 0 0 1-.598.351l-.002.008-2.581-.438a5.156 5.156 0 0 1 .309-2.98l2.456 1.051.002.011a.44.44 0 0 1 .414.997zm-.041 2.526a.44.44 0 0 1-.756-.173l-.011-.002-1.051-2.456a5.156 5.156 0 0 1 2.98-.309l.438 2.581.002.008a.44.44 0 0 1-.602.351zm-2.081 1.672a.44.44 0 0 1-.164-.81l-.003-.006-2.65-.38a5.156 5.156 0 0 1 1.943 2.788l1.051-2.456.002-.002a.44.44 0 0 1 .821.866zm-2.487-1.672a.44.44 0 0 1-.747.207l-.001-.005-.38-2.65a5.156 5.156 0 0 1 2.788 1.943l-2.456 1.051-.002.002a.44.44 0 0 1-.202.452zm-2.04-.041a.44.44 0 0 1 .351.598l-.008.002.438 2.581a5.156 5.156 0 0 1-2.98-.309l1.051-2.456.011-.002a.44.44 0 0 1 .137-.414zm-2.526.041a.44.44 0 0 1 .173.756l.002.011 2.456 1.051a5.156 5.156 0 0 1-.309-2.98l-2.581-.438-.008-.002a.44.44 0 0 1 .267-.398z" />
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
			name: "Neural Framework",
			description: "Advanced AI-powered development framework with quantum computing integration",
			stars: 2847,
			language: "TypeScript",
			tech: "AI/ML",
		},
		{
			name: "CyberShield",
			description: "Next-generation cybersecurity toolkit for modern applications",
			stars: 1923,
			language: "Rust",
			tech: "Security",
		},
		{
			name: "QuantumDB",
			description: "High-performance distributed database with real-time analytics",
			stars: 1456,
			language: "Go",
			tech: "Database",
		},
	]

	const technologies = [
		{
			name: "React",
			description: "Frontend Framework",
			color: "from-blue-400 to-cyan-400",
			icon: ReactIcon,
		},
		{
			name: "TanStack",
			description: "Data Fetching & State",
			color: "from-orange-400 to-red-400",
			icon: TanStackIcon,
		},
		{
			name: "FastAPI",
			description: "Backend Framework",
			color: "from-green-400 to-emerald-400",
			icon: FastAPIIcon,
		},
		{
			name: "Docker",
			description: "Containerization",
			color: "from-blue-500 to-blue-600",
			icon: DockerIcon,
		},
		{
			name: "TypeScript",
			description: "Type Safety",
			color: "from-blue-400 to-blue-500",
			icon: TypeScriptIcon,
		},
		{
			name: "PostgreSQL",
			description: "Database",
			color: "from-blue-600 to-indigo-600",
			icon: PostgreSQLIcon,
		},
		{
			name: "Redis",
			description: "Caching & Sessions",
			color: "from-red-500 to-red-600",
			icon: RedisIcon,
		},
		{
			name: "Kubernetes",
			description: "Orchestration",
			color: "from-blue-500 to-purple-500",
			icon: KubernetesIcon,
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
			<div className="fixed inset-0 z-0">
				<div className="absolute inset-0 bg-gray-900" />
				<div
					className="absolute inset-0 opacity-25"
					style={{
						backgroundImage: `
							linear-gradient(rgba(0, 255, 255, 0.2) 2px, transparent 2px),
							linear-gradient(90deg, rgba(0, 255, 255, 0.2) 2px, transparent 2px)
						`,
						backgroundSize: "50px 50px",
						animation: "grid-move 20s linear infinite",
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
										href="#systems"
										className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
									>
										Systems
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
									<a href="https://github.com" className="flex items-center space-x-0">
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
										className="h-5 w-auto [filter:brightness(0)_saturate(100%)_invert(86%)_sepia(6%)_saturate(151%)_hue-rotate(169deg)_brightness(95%)_contrast(90%)] hover:[filter:brightness(0)_saturate(100%)_invert(74%)_sepia(80%)_saturate(3207%)_hue-rotate(177deg)_brightness(103%)_contrast(101%)] transition-all duration-300"
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
									<a href="https://github.com" className="flex items-center space-x-0 !text-cyan-400 hover:!text-white">
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
				<section id="systems" className="py-20 px-4 relative">
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
												<item.icon className="h-6 w-6 text-cyan-400" />
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
								<a href="https://github.com" className="flex items-center space-x-0">
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
									<Card className="bg-gray-900/30 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/25 relative overflow-hidden">
										<div
											className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
										/>
										<CardContent className="p-6 text-center relative">
											<div
												className={`w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br ${tech.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300 flex items-center justify-center`}
											>
												<tech.icon className="w-8 h-8 text-white opacity-80" />
											</div>
											<h3 className="font-black text-white group-hover:text-cyan-400 transition-colors mb-1">
												{tech.name}
											</h3>
											<p className="text-xs text-gray-400 font-mono">{tech.description}</p>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Founders Section */}
				<section id="founders" className="py-20 px-4">
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
									<a href="https://github.com" className="flex items-center" target="_blank" rel="noopener noreferrer">
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
												{ name: "Documentation", href: "#" },
												{ name: "API Reference", href: "#" },
												{ name: "Getting Started", href: "#" },
												{ name: "Examples", href: "#" },
												{ name: "Changelog", href: "#" },
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
											© {new Date().getFullYear()} SEALNEXT // OPEN SOURCE SYSTEMS
										</span>
										<div className="flex items-center space-x-4">
											<a href="#" className="text-xs text-gray-500 hover:text-cyan-400 transition-colors font-mono">
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
