"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; // Importa nossa conexão real
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/brand/Logo";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleLogin(formData: FormData) {
        setLoading(true);
        setError(null);

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        // Tenta logar no Supabase
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message); // Exibe erro real (ex: "Senha incorreta")
            setLoading(false);
        } else {
            // Sucesso: Redireciona e atualiza a sessão
            router.push('/');
            router.refresh();
        }
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-muted/50 p-4">
            <div className="w-full max-w-md space-y-6">
                <div className="flex justify-center">
                    {/* Se o componente Logo ainda não existir, isso vai dar erro. 
                        Se der erro, troque <Logo /> por <span>PCP Suporte Rei</span> provisoriamente */}
                    <Logo className="h-12 w-12" />
                </div>

                <Card className="w-full shadow-lg">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-2xl font-bold">Acesso ao Sistema</CardTitle>
                        <CardDescription>Entre com suas credenciais PCP</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Note que mudamos de onSubmit para action={handleLogin} */}
                        <form action={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="seu@email.com"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Senha</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                />
                            </div>

                            {/* Área de Erro (Só aparece se errar a senha) */}
                            {error && (
                                <div className="text-sm text-red-500 font-medium text-center bg-red-50 p-2 rounded border border-red-100">
                                    {error}
                                </div>
                            )}

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Entrando...' : 'Entrar'}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <p className="text-xs text-muted-foreground">
                            Protegido por PCP Suporte Rei
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}