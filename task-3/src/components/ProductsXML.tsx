import { Highlight, themes } from 'prism-react-renderer';

export type ProductsXMLProps = { xml: string };

export function ProductsXML({ xml }: ProductsXMLProps) {
  return (
    <div>
      <h2>
        Product Totals -{' '}
        <DownloadButton
          label="Download XML"
          fileName="totals.xml"
          textOutput={xml}
        />
      </h2>
      {/* <a href="/totals" download="totals.xml"> */}
      {/* </a> */}
      <Highlight theme={themes.github} code={xml} language="xml">
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre className="product-totals" style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {/* <span>{i + 1}</span> */}
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      {/* <pre>
        <code>{xml}</code>
      </pre> */}
    </div>
  );
}

const DownloadButton = ({
  textOutput,
  fileName,
  label,
}: {
  label: string;
  textOutput: string;
  fileName: string;
}) => {
  const file = new Blob([textOutput], { type: 'text/plain' });

  return (
    <a
      download={fileName}
      target="_blank"
      rel="noreferrer"
      href={URL.createObjectURL(file)}
    >
      {label}
    </a>
  );
};
