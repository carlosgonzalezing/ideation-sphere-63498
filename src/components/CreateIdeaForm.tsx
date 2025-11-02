import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImagePlus, Video, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { uploadPostMedia } from "@/lib/storage";
import { useCreatePost } from "@/hooks/usePosts";

interface CreateIdeaFormProps {
  onClose?: () => void;
}

export const CreateIdeaForm = ({ onClose }: CreateIdeaFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [skills, setSkills] = useState("");
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const createPost = useCreatePost();

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
        setMediaType(type);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({ title: "Error", description: "Debes iniciar sesión" });
      return;
    }

    setUploading(true);

    try {
      let media_url;
      if (mediaFile) {
        media_url = await uploadPostMedia(mediaFile, user.id);
      }

      await createPost.mutateAsync({
        content: description,
        media_url,
        media_type: mediaType || undefined,
        post_type: 'idea',
        visibility: 'public',
        user_id: user.id,
        idea: {
          title,
          description,
          category,
          skills: skills.split(',').map(s => s.trim()).filter(Boolean),
        },
      });

      toast({ title: "Idea publicada", description: "Tu idea ha sido compartida con la comunidad" });
      if (onClose) onClose();
    } catch (error) {
      toast({ title: "Error", description: "No se pudo publicar la idea" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <Label htmlFor="title" className="text-base font-semibold text-foreground">Título de la idea</Label>
        <Input 
          id="title" 
          placeholder="Ej: App de Mentoría Estudiantil" 
          className="h-11" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required 
        />
      </div>

      <div className="space-y-4">
        <Label htmlFor="description" className="text-base font-semibold text-foreground">Descripción</Label>
        <Textarea
          id="description"
          placeholder="Describe tu idea, qué problema resuelve y qué tipo de colaboradores buscas..."
          className="min-h-[140px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="space-y-4">
        <Label htmlFor="category" className="text-base font-semibold text-foreground">Categoría</Label>
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger id="category">
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tecnologia">Tecnología</SelectItem>
            <SelectItem value="diseno">Diseño</SelectItem>
            <SelectItem value="emprendimiento">Emprendimiento</SelectItem>
            <SelectItem value="investigacion">Investigación</SelectItem>
            <SelectItem value="social">Impacto Social</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Label htmlFor="skills" className="text-base font-semibold text-foreground">Habilidades que buscas</Label>
        <Input 
          id="skills" 
          placeholder="Ej: Desarrollo, Diseño UI/UX, Marketing" 
          className="h-11"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
      </div>

      <div className="space-y-4 py-2">
        <Label className="text-base font-semibold text-foreground">Medios (opcional)</Label>
        <div className="flex gap-3">
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={(e) => handleMediaChange(e, "image")}
            className="hidden"
          />
          <Input
            id="video-upload"
            type="file"
            accept="video/*"
            onChange={(e) => handleMediaChange(e, "video")}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("image-upload")?.click()}
            className="flex-1 h-11 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 hover:bg-primary/20 transition-all group"
          >
            <ImagePlus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
            Imagen
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("video-upload")?.click()}
            className="flex-1 h-11 bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20 hover:bg-accent/20 transition-all group"
          >
            <Video className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
            Video
          </Button>
        </div>
        {mediaPreview && (
          <div className="relative mt-4">
            {mediaType === "image" ? (
              <img src={mediaPreview} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-border" />
            ) : (
              <video src={mediaPreview} controls className="w-full h-48 object-cover rounded-lg border border-border" />
            )}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => {
                setMediaPreview(null);
                setMediaType(null);
              }}
              className="absolute top-2 right-2 h-8 w-8 bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white shadow-lg"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <Button type="submit" className="w-full h-11 mt-8 font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90" disabled={uploading}>
        {uploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Publicando...
          </>
        ) : (
          "Publicar idea"
        )}
      </Button>
    </form>
  );
};
