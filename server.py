#!/usr/bin/env python3
"""
Simple HTTP Server for Frontend Collection
Serves index.html by default and handles routing properly
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_GET(self):
        # If requesting root, serve index.html
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()

def main():
    PORT = 8000
    
    # Ensure we're in the right directory
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    # Check if index.html exists
    if not Path('index.html').exists():
        print("❌ Error: index.html not found in current directory")
        print(f"   Current directory: {os.getcwd()}")
        sys.exit(1)
    
    Handler = CustomHandler
    
    with socketserver.TCPServer(("localhost", PORT), Handler) as httpd:
        print("🚀 Frontend Collection Server Starting...")
        print(f"📁 Serving from: {os.getcwd()}")
        print(f"🌐 Server running at: http://localhost:{PORT}")
        print("⚡ Opening browser...")
        print("🛑 Press Ctrl+C to stop the server")
        print("-" * 50)
        
        # Open browser
        webbrowser.open(f'http://localhost:{PORT}')
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped by user")
            sys.exit(0)

if __name__ == "__main__":
    main()
