import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { MermaidRenderer } from "./MermaidRenderer";

interface MarkdownRendererProps {
  content: string;
  placeholder?: string;
}

export function MarkdownRenderer({
  content,
  placeholder = "*Start writing to see the preview...*",
}: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold text-heading-ink tracking-tight leading-tight mt-10 mb-4 first:mt-0">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold text-heading-ink tracking-tight mt-8 mb-3 border-t border-table-border pt-6 first:mt-0 first:pt-0 first:border-0">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-semibold text-ink-3 mt-6 mb-2">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-base font-semibold text-ink-4 mt-5 mb-2">
            {children}
          </h4>
        ),
        p: ({ children }) => (
          <p className="text-base text-table-text leading-relaxed mb-4 last:mb-0 text-pretty [word-break:break-word]">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="my-4 space-y-2 pl-0 list-none">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="my-4 space-y-2 pl-5 list-decimal">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="flex items-start gap-2.5 text-base text-table-text leading-relaxed">
            <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-list-dot" />
            <span>{children}</span>
          </li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-quote-border pl-5 my-6 text-quote-ink italic">
            {children}
          </blockquote>
        ),
        hr: () => (
          <hr className="my-8 border-none border-t border-hr" />
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-heading-ink">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-inherit">{children}</em>
        ),
        code: ({ node, inline, className, children, ...props }: any) => {
          const match = /language-(\w+)/.exec(className || "");
          const language = match ? match[1] : "";
          const codeContent = String(children).replace(/\n$/, "");

          if (language === "mermaid") {
            return <MermaidRenderer chart={codeContent} />;
          }

          if (!inline && codeContent.includes("\n")) {
            return (
              <div className="my-6 rounded-md overflow-hidden border border-table-border shadow-sm">
                <div className="bg-window-bar px-4 py-2.5 flex items-center justify-between border-b border-window-bar-border">
                  <span className="text-[11px] font-mono font-bold text-window-label">
                    {language || "plaintext"}
                  </span>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-terminal-red" />
                    <div className="w-2.5 h-2.5 rounded-full bg-terminal-yellow" />
                    <div className="w-2.5 h-2.5 rounded-full bg-terminal-green" />
                  </div>
                </div>
                {match ? (
                  <SyntaxHighlighter
                    {...props}
                    style={vscDarkPlus}
                    language={language}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      padding: "1.25rem 1.5rem",
                      fontSize: "13px",
                      lineHeight: "1.7",
                      backgroundColor: "#1e1e1e",
                    }}
                  >
                    {codeContent}
                  </SyntaxHighlighter>
                ) : (
                  <pre className="p-6 overflow-x-auto text-[13px] font-mono leading-relaxed text-code-text bg-code-block" style={{ margin: 0 }}>
                    {codeContent}
                  </pre>
                )}
              </div>
            );
          }

          return (
            <code className="px-1.5 py-0.5 rounded text-[13px] font-mono text-inline-code bg-inline-code-bg border border-inline-code-border mx-0.5 align-middle">
              {children}
            </code>
          );
        },
        pre: ({ children }) => <>{children}</>,
        table: ({ children }) => (
          <div className="my-8 overflow-x-auto border border-table-border rounded-md">
            <table className="w-full border-collapse text-left text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-table-head border-b border-table-border">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="px-5 py-3 text-[11px] font-bold text-table-head-text">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-5 py-3 text-sm text-table-text border-b border-table-row-border last:border-0 leading-relaxed">
            {children}
          </td>
        ),
        tr: ({ children }) => (
          <tr className="hover:bg-table-row-hover transition-colors">{children}</tr>
        ),
        a: ({ children, href, title }) => (
          <a
            href={href}
            title={title}
            className="text-link underline decoration-link/40 underline-offset-2 hover:decoration-link transition-colors font-medium"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {children}
          </a>
        ),
      }}
    >
      {content || placeholder}
    </ReactMarkdown>
  );
}
