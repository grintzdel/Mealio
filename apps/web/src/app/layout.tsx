import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Mealio",
    description: "Recettes de cuisine pour étudiants par des étudiants",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
        <body>
        {children}
        </body>
        </html>
    );
}
