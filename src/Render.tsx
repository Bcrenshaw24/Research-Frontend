import 'katex/dist/katex.min.css'
import { BlockMath, InlineMath } from 'react-katex'

export default function render(text: string) {
    const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[^$\n]*?\$|\*\*[^*]+?\*\*)/g)

    return parts.map((part, index) => {
        if (part.startsWith('$$') && part.endsWith("$$")) {
            const math = part.slice(2, -2).trim()
            return <BlockMath key={index} math={math} />
        }
        else if (part.startsWith("$") && part.endsWith("$")) {
            const math = part.slice(1, -1).trim()
            return <InlineMath key={index} math={math} />
        }
        else if (part.startsWith("**") && part.endsWith("**")) { 
            return <b>{part.slice(2, -2)}</b>
        }
        return <span>{part}</span>
    })
}