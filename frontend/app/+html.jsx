function ScrollViewStyleReset() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: "#root,body,html{height:100%}body{overflow:hidden}#root{display:flex}",
      }}
      id="expo-reset"
    />
  );
}

export default function Html({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
          name="viewport"
        />
        <meta content="#15173D" name="theme-color" />
        <meta content="light" name="color-scheme" />
        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  );
}
