from http.server import SimpleHTTPRequestHandler, HTTPServer

class CustomHandler(SimpleHTTPRequestHandler):
    def guess_type(self, path):
        if path.endswith(".js"):
            return "application/javascript"
        return super().guess_type(path)

PORT = 8100  # You can change this if needed
server_address = ("", PORT)

httpd = HTTPServer(server_address, CustomHandler)
print(f"Serving at http://localhost:{PORT}")
httpd.serve_forever()