import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const DynamicEditor = (props) => {
	if (typeof window === "undefined") {
		return <p>Loading CKEditor5 ...!</p>;
	}

	return <CKEditor editor={ClassicEditor} {...props} />;
};

export default DynamicEditor;
