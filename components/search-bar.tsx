"use client";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Camera, Search, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/use-fetch";
import { processImageSearch } from "@/actions/home";

const SearchBar = () => {
  const router = useRouter();
  // State variables
  const [searchTerm, setSearchTerm] = useState("");
  const [searchImage, setSearchImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isImageSearchActive, setIsImageSearchActive] = useState(false);

  // Use the useFetch hook for image processing
  const {
    loading: isProcessing,
    fn: processImageFn,
    data: processResult,
    error: processError,
  } = useFetch(processImageSearch);

  // Handle process result and errors with useEffect
  useEffect(() => {
    if (processResult?.success) {
      const params = new URLSearchParams();

      // Add extracted params to the search
      if (processResult.data.make) params.set("make", processResult.data.make);
      if (processResult.data.bodyType)
        params.set("bodyType", processResult.data.bodyType);
      if (processResult.data.color)
        params.set("color", processResult.data.color);

      // Redirect to search results
      router.push(`/cars?${params.toString()}`);
    }
  }, [processResult, router]);

  useEffect(() => {
    if (processError) {
      toast.error(
        "Failed to analyze image: " +
          (processError["message"] || "Unknown error")
      );
    }
  }, [processError]);

  const onDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB limit");
        return;
      }
      setIsUploading(true);
      setSearchImage(file);

      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setIsUploading(false);
        toast.success("Image uploaded successfully");
      };

      reader.onerror = () => {
        setIsUploading(false);
        toast.error("Error uploading image");
      };

      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
      maxFiles: 1,
    });

  // Handle form submission
  const handleTextSubmit = (e: any) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  const handleImageSubmit = async (e: any) => {
    e.preventDefault();
    if (!searchImage) {
      toast.error("Please upload an image to search");
      return;
    }
    // Use the processImageFn from useFetch hook
    await processImageFn(searchImage);
  };

  return (
    <div>
      <form onSubmit={handleTextSubmit}>
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-5 h-5" />
          {/* Text Search Section*/}
          <Input
            type="text"
            className="pl-10 pr-12 py-6 w-full rounded-full border-gray-300 bg-white/95 backdrop-blur-sm"
            placeholder="Search for cars, brands, features... Or use our AI Image Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Image Search Button */}
          <div className="absolute right-[100px]">
            <Camera
              size={35}
              onClick={() => setIsImageSearchActive(!isImageSearchActive)}
              className="cursor-pointer rounded-xl p-1.5"
              style={{
                background: isImageSearchActive ? "black" : "",
                color: isImageSearchActive ? "white" : "",
              }}
            />
          </div>
          {/* Submit Button */}
          <Button type="submit" className="absolute right-2 rounded-full">
            Search
          </Button>
        </div>
      </form>

      {/* Image Search Section */}
      {isImageSearchActive && (
        <div className="mt-4">
          <form onSubmit={handleImageSubmit} className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-3xl p-6 text-center">
              <div {...getRootProps()} className="cursor-pointer">
                <input {...getInputProps()} />
                {imagePreview ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={imagePreview}
                      alt="Car preview"
                      className="h-40 object-contain mb-4"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="h-12 w-12 text-gray-400 mb-2" />

                    <p className="text-white mb-2">
                      {isDragActive && !isDragReject
                        ? "Upload the file you want to search for"
                        : "Drag 'n' drop some files here, or click to select files"}
                    </p>
                    {isDragReject && (
                      <p className="text-red-500 mb-2">Invalid image type</p>
                    )}
                    <p className="text-gray-400 text-sm">
                      Supports: JPG, JPEG, PNG (max 5MB)
                    </p>
                  </div>
                )}
              </div>
              {imagePreview && (
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => {
                    setSearchImage(null);
                    setImagePreview("");
                    toast.info("Image removed");
                  }}
                >
                  Remove Image
                </Button>
              )}
            </div>
            {imagePreview && (
              <Button
                type="submit"
                className="w-full cursor-pointer rounded-full"
                disabled={isUploading || isProcessing}
              >
                {isUploading
                  ? "Uploading..."
                  : isProcessing
                  ? "Analyzing image..."
                  : "Search with this Image"}
              </Button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
