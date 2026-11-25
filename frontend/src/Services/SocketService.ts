import { io, Socket } from "socket.io-client";
import { appConfig } from "../Utils/AppConfig";

class SocketService {

    private socket: Socket | null = null;

    // Connect to server
    public connect(): void {
        if (this.socket?.connected) {
            console.log("Already connected");
            return;
        }

        this.socket = io(appConfig.serverUrl);

        this.socket.on("connect", () => {
            console.log("Connected to server:", this.socket?.id);
        });

        this.socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });

        this.socket.on("error", (error) => {
            console.error("Socket error:", error);
        });
    }

    // Disconnect from server
    public disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            console.log("Socket disconnected");
        }
    }

    // Listen to a specific event
    public on(event: string, callback: (data: any) => void): void {
        if (!this.socket) {
            console.error("Socket is not connected. Call connect() first.");
            return;
        }
        this.socket.on(event, callback);
    }

    // Remove a specific event listener
    public off(event: string): void {
        if (this.socket) {
            this.socket.off(event);
        }
    }

    // Emit an event to server
    public emit(event: string, data?: any): void {
        if (!this.socket) {
            console.error("Socket is not connected. Call connect() first.");
            return;
        }
        this.socket.emit(event, data);
    }

    // Check if connected
    public isConnected(): boolean {
        return this.socket?.connected ?? false;
    }

    // Get socket instance (for advanced usage)
    public getSocket(): Socket | null {
        return this.socket;
    }
}

export const socketService = new SocketService(); // Singleton
