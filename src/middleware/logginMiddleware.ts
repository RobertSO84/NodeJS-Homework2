export function loggingMiddleware(
  req: {
    method: any;
    url: string;
    body: any;
  },
  _res: any,
  next: () => void
) {
  //   const method = req.url.split("/")[2];
  //   const args = req.body;
  console.log(
    `Service method ${req.method} ${
      req.url
    } invoked with arguments: ${JSON.stringify(req.body)}`
  );
  next();
}
