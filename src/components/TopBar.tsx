import { useState } from "react";
import { MessageSquare, Menu, Settings, User, Bell, HelpCircle, LogOut, Shield, Palette, Globe, Users, Bookmark, Info, AlertCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";

export const TopBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-card/95 border-b border-border z-40 backdrop-blur-md shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-4 max-w-screen-xl mx-auto">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">UC</span>
          </div>
          <div>
            <h1 className="font-bold text-xl text-foreground tracking-tight">UniConnect</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Conectando ideas universitarias</p>
          </div>
        </Link>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/messages">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10 hover:text-primary transition-all duration-200 relative rounded-full"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-accent rounded-full border-2 border-card"></span>
            </Button>
          </Link>
          
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-full"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-card border-border min-h-screen overflow-y-auto">
              <DrawerHeader className="border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-16 w-16 ring-2 ring-primary/20">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-lg font-semibold">
                      TU
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <DrawerTitle className="text-xl">Innovador Tech</DrawerTitle>
                    <DrawerDescription className="text-sm">@tech_innovator</DrawerDescription>
                  </div>
                </div>
              </DrawerHeader>

              <div className="p-4 space-y-1">
                {/* Mi Cuenta */}
                <Link to="/profile/tech_innovator" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start h-auto py-4 px-4 hover:bg-primary/10">
                    <User className="mr-3 h-5 w-5 text-primary" />
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-base">Mi Perfil</span>
                      <span className="text-xs text-muted-foreground">Ver y editar perfil completo</span>
                    </div>
                  </Button>
                </Link>

                <Button variant="ghost" className="w-full justify-start h-auto py-4 px-4 hover:bg-primary/10">
                  <Users className="mr-3 h-5 w-5 text-primary" />
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-base">Mis Conexiones</span>
                    <span className="text-xs text-muted-foreground">1.2K seguidores · 324 seguidos</span>
                  </div>
                </Button>

                <Link to="/messages" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start h-auto py-4 px-4 hover:bg-primary/10">
                    <MessageSquare className="mr-3 h-5 w-5 text-primary" />
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-base">Mensajes</span>
                      <span className="text-xs text-muted-foreground">Chats y grupos</span>
                    </div>
                  </Button>
                </Link>

                <Link to="/notifications" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start h-auto py-4 px-4 hover:bg-primary/10">
                    <Bell className="mr-3 h-5 w-5 text-primary" />
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-base">Notificaciones</span>
                      <span className="text-xs text-muted-foreground">Gestionar avisos y alertas</span>
                    </div>
                  </Button>
                </Link>

                <Button variant="ghost" className="w-full justify-start h-auto py-4 px-4 hover:bg-primary/10">
                  <Bookmark className="mr-3 h-5 w-5 text-primary" />
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-base">Guardados</span>
                    <span className="text-xs text-muted-foreground">Publicaciones guardadas</span>
                  </div>
                </Button>

                <Separator className="my-2" />

                {/* Configuración */}
                <Button variant="ghost" className="w-full justify-start h-auto py-4 px-4 hover:bg-primary/10">
                  <Settings className="mr-3 h-5 w-5 text-primary" />
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-base">Configuración y Privacidad</span>
                    <span className="text-xs text-muted-foreground">Ajustes de cuenta</span>
                  </div>
                </Button>

                <Button variant="ghost" className="w-full justify-start h-auto py-4 px-4 hover:bg-primary/10">
                  <Palette className="mr-3 h-5 w-5 text-primary" />
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-base">Apariencia</span>
                    <span className="text-xs text-muted-foreground">Tema claro/oscuro</span>
                  </div>
                </Button>

                <Button variant="ghost" className="w-full justify-start h-auto py-4 px-4 hover:bg-primary/10">
                  <Shield className="mr-3 h-5 w-5 text-primary" />
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-base">Seguridad</span>
                    <span className="text-xs text-muted-foreground">Contraseña y verificación</span>
                  </div>
                </Button>

                <Button variant="ghost" className="w-full justify-start h-auto py-4 px-4 hover:bg-primary/10">
                  <Globe className="mr-3 h-5 w-5 text-primary" />
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-base">Idioma</span>
                    <span className="text-xs text-muted-foreground">Español</span>
                  </div>
                </Button>

                <Separator className="my-2" />

                {/* Ayuda */}
                <Button variant="ghost" className="w-full justify-start h-auto py-4 px-4 hover:bg-primary/10">
                  <HelpCircle className="mr-3 h-5 w-5 text-primary" />
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-base">Ayuda y Soporte</span>
                    <span className="text-xs text-muted-foreground">Centro de ayuda, reportar problemas</span>
                  </div>
                </Button>

                <Button variant="ghost" className="w-full justify-start h-auto py-4 px-4 hover:bg-primary/10">
                  <AlertCircle className="mr-3 h-5 w-5 text-primary" />
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-base">Reportar Problema</span>
                    <span className="text-xs text-muted-foreground">Enviar feedback</span>
                  </div>
                </Button>

                <Button variant="ghost" className="w-full justify-start h-auto py-4 px-4 hover:bg-primary/10">
                  <Info className="mr-3 h-5 w-5 text-primary" />
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-base">Acerca de</span>
                    <span className="text-xs text-muted-foreground">Versión 1.0.0</span>
                  </div>
                </Button>

                <Separator className="my-2" />

                <Button variant="ghost" className="w-full justify-start h-auto py-4 px-4 hover:bg-destructive/10 text-destructive hover:text-destructive">
                  <LogOut className="mr-3 h-5 w-5" />
                  <span className="font-semibold text-base">Cerrar Sesión</span>
                </Button>
              </div>

              <DrawerFooter className="border-t border-border">
                <DrawerClose asChild>
                  <Button variant="outline">Cerrar</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          
          <Link to="/profile/tech_innovator">
            <Avatar className="h-9 w-9 ring-2 ring-primary/20 cursor-pointer hover:ring-primary/40 transition-all">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-sm font-semibold">
                TU
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
};
