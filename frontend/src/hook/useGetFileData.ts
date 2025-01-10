import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useGetFileData = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("authToken");
  
  useEffect(() => {
    const fetchData = async () => {
      if (!id || !token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/file/alldata?file_id=${id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFileData(data);
        } else {
          const data = await response.json();
          console.error(data);

          if (data.message === "Not authorized, token failed") {
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { loading, fileData };
};

export default useGetFileData;
