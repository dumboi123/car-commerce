// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   fuelTypes,
//   transmissions,
//   bodyTypesAdmin,
//   carStatuses,
// } from "@/lib/data";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@radix-ui/react-select";
// import { Upload, X, Loader2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useDropzone } from "react-dropzone";
// import { useRouter } from "next/navigation";

// const ManualForm = () => {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Car Details</CardTitle>
//         <CardDescription>
//           Enter the details of the car you want to add.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {/* brand */}
//             <div className="space-y-2">
//               <Label htmlFor="brand">Brand</Label>
//               <Input
//                 id="brand"
//                 {...register("brand")}
//                 placeholder="e.g. Toyota"
//                 className={errors.brand ? "border-red-500" : ""}
//               />
//               {errors.brand && (
//                 <p className="text-xs text-red-500">{errors.brand.message}</p>
//               )}
//             </div>

//             {/* Model */}
//             <div className="space-y-2">
//               <Label htmlFor="model">Model</Label>
//               <Input
//                 id="model"
//                 {...register("model")}
//                 placeholder="e.g. Camry"
//                 className={errors.model ? "border-red-500" : ""}
//               />
//               {errors.model && (
//                 <p className="text-xs text-red-500">{errors.model.message}</p>
//               )}
//             </div>

//             {/* Year */}
//             <div className="space-y-2">
//               <Label htmlFor="year">Year</Label>
//               <Input
//                 id="year"
//                 {...register("year")}
//                 placeholder="e.g. 2022"
//                 className={errors.year ? "border-red-500" : ""}
//               />
//               {errors.year && (
//                 <p className="text-xs text-red-500">{errors.year.message}</p>
//               )}
//             </div>

//             {/* Price */}
//             <div className="space-y-2">
//               <Label htmlFor="price">Price ($)</Label>
//               <Input
//                 id="price"
//                 {...register("price")}
//                 placeholder="e.g. 25000"
//                 className={errors.price ? "border-red-500" : ""}
//               />
//               {errors.price && (
//                 <p className="text-xs text-red-500">{errors.price.message}</p>
//               )}
//             </div>

//             {/* Mileage */}
//             <div className="space-y-2">
//               <Label htmlFor="mileage">Mileage</Label>
//               <Input
//                 id="mileage"
//                 {...register("mileage")}
//                 placeholder="e.g. 15000"
//                 className={errors.mileage ? "border-red-500" : ""}
//               />
//               {errors.mileage && (
//                 <p className="text-xs text-red-500">{errors.mileage.message}</p>
//               )}
//             </div>

//             {/* Color */}
//             <div className="space-y-2">
//               <Label htmlFor="color">Color</Label>
//               <Input
//                 id="color"
//                 {...register("color")}
//                 placeholder="e.g. Blue"
//                 className={errors.color ? "border-red-500" : ""}
//               />
//               {errors.color && (
//                 <p className="text-xs text-red-500">{errors.color.message}</p>
//               )}
//             </div>

//             {/* Fuel Type */}
//             <div className="space-y-2">
//               <Label htmlFor="fuelType">Fuel Type</Label>
//               <Select
//                 onValueChange={(value) => setValue("fuelType", value)}
//                 defaultValue={getValues("fuelType")}
//               >
//                 <SelectTrigger
//                   className={errors.fuelType ? "border-red-500" : ""}
//                 >
//                   <SelectValue placeholder="Select fuel type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {fuelTypes.map((type) => (
//                     <SelectItem key={type} value={type}>
//                       {type}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               {errors.fuelType && (
//                 <p className="text-xs text-red-500">
//                   {errors.fuelType.message}
//                 </p>
//               )}
//             </div>

//             {/* Transmission */}
//             <div className="space-y-2">
//               <Label htmlFor="transmission">Transmission</Label>
//               <Select
//                 onValueChange={(value) => setValue("transmission", value)}
//                 defaultValue={getValues("transmission")}
//               >
//                 <SelectTrigger
//                   className={errors.transmission ? "border-red-500" : ""}
//                 >
//                   <SelectValue placeholder="Select transmission" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {transmissions.map((type) => (
//                     <SelectItem key={type} value={type}>
//                       {type}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               {errors.transmission && (
//                 <p className="text-xs text-red-500">
//                   {errors.transmission.message}
//                 </p>
//               )}
//             </div>

//             {/* Body Type */}
//             <div className="space-y-2">
//               <Label htmlFor="bodyType">Body Type</Label>
//               <Select
//                 onValueChange={(value) => setValue("bodyType", value)}
//                 defaultValue={getValues("bodyType")}
//               >
//                 <SelectTrigger
//                   className={errors.bodyType ? "border-red-500" : ""}
//                 >
//                   <SelectValue placeholder="Select body type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {bodyTypesAdmin.map((type) => (
//                     <SelectItem key={type} value={type}>
//                       {type}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               {errors.bodyType && (
//                 <p className="text-xs text-red-500">
//                   {errors.bodyType.message}
//                 </p>
//               )}
//             </div>

//             {/* Seats */}
//             <div className="space-y-2">
//               <Label htmlFor="seats">
//                 Number of Seats{" "}
//                 <span className="text-sm text-gray-500">(Optional)</span>
//               </Label>
//               <Input id="seats" {...register("seats")} placeholder="e.g. 5" />
//             </div>

//             {/* Status */}
//             <div className="space-y-2">
//               <Label htmlFor="status">Status</Label>
//               <Select
//                 onValueChange={(value) =>
//                   setValue(
//                     "status",
//                     value as "AVAILABLE" | "UNAVAILABLE" | "SOLD"
//                   )
//                 }
//                 defaultValue={getValues("status")}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {carStatuses.map((status) => (
//                     <SelectItem key={status} value={status}>
//                       {status.charAt(0) + status.slice(1).toLowerCase()}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           {/* Description */}
//           <div className="space-y-2">
//             <Label htmlFor="description">Description</Label>
//             <Textarea
//               id="description"
//               {...register("description")}
//               placeholder="Enter detailed description of the car..."
//               className={`min-h-32 ${
//                 errors.description ? "border-red-500" : ""
//               }`}
//             />
//             {errors.description && (
//               <p className="text-xs text-red-500">
//                 {errors.description.message}
//               </p>
//             )}
//           </div>

//           {/* Featured */}
//           <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
//             <Checkbox
//               id="featured"
//               checked={watch("featured")}
//               onCheckedChange={(checked) => {
//                 setValue("featured", checked === true);
//               }}
//             />
//             <div className="space-y-1 leading-none">
//               <Label htmlFor="featured">Feature this car</Label>
//               <p className="text-sm text-gray-500">
//                 Featured cars appear on the homepage
//               </p>
//             </div>
//           </div>

//           {/* Image Upload with Dropzone */}
//           <div>
//             <Label
//               htmlFor="images"
//               className={imageError ? "text-red-500" : ""}
//             >
//               Images {imageError && <span className="text-red-500">*</span>}
//             </Label>
//             <div className="mt-2">
//               <div
//                 {...getMultiImageRootProps()}
//                 className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition ${
//                   imageError ? "border-red-500" : "border-gray-300"
//                 }`}
//               >
//                 <input {...getMultiImageInputProps()} />
//                 <div className="flex flex-col items-center justify-center">
//                   <Upload className="h-12 w-12 text-gray-400 mb-3" />
//                   <span className="text-sm text-gray-600">
//                     Drag & drop or click to upload multiple images
//                   </span>
//                   <span className="text-xs text-gray-500 mt-1">
//                     (JPG, PNG, WebP, max 5MB each)
//                   </span>
//                 </div>
//               </div>
//               {imageError && (
//                 <p className="text-xs text-red-500 mt-1">{imageError}</p>
//               )}
//               {uploadProgress > 0 && (
//                 <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
//                   <div
//                     className="bg-blue-600 h-2.5 rounded-full"
//                     style={{ width: `${uploadProgress}%` }}
//                   ></div>
//                 </div>
//               )}
//             </div>

//             {/* Image Previews */}
//             {uploadedImages.length > 0 && (
//               <div className="mt-4">
//                 <h3 className="text-sm font-medium mb-2">
//                   Uploaded Images ({uploadedImages.length})
//                 </h3>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//                   {uploadedImages
//                     .filter((image): image is string => image !== null)
//                     .map((image, index) => (
//                       <div key={index} className="relative group">
//                         <Image
//                           src={image}
//                           alt={`Car image ${index + 1}`}
//                           height={50}
//                           width={50}
//                           className="h-28 w-full object-cover rounded-md"
//                           priority
//                         />
//                         <Button
//                           type="button"
//                           size="icon"
//                           variant="destructive"
//                           className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
//                           onClick={() => removeImage(index)}
//                         >
//                           <X className="h-3 w-3" />
//                         </Button>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           <Button
//             type="submit"
//             className="w-full md:w-auto"
//             disabled={addCarLoading}
//           >
//             {addCarLoading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Adding Car...
//               </>
//             ) : (
//               "Add Car"
//             )}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default ManualForm;
