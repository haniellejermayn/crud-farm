import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { animalsApi } from "../../api/client";
import { ArrowLeft } from "lucide-react";

export const AnimalForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    isHealthy: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchAnimal();
    }
  }, [id]);

  const fetchAnimal = async () => {
    try {
      const response = await animalsApi.getOne(Number(id));
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching animal:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await animalsApi.update(Number(id), formData);
      } else {
        await animalsApi.create(formData);
      }
      navigate("/animals");
    } catch (error) {
      console.error("Error saving animal:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate("/animals")}
        className="flex items-center text-sage-600 hover:text-sage-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Animals
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-sage-900">
          {isEdit ? "Edit Animal" : "Add New Animal"}
        </h1>
        <p className="text-sage-600 mt-2">
          {isEdit
            ? "Update animal information"
            : "Add a new animal to your farm"}
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-sage-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="input-field"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                placeholder="Enter animal name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-sage-700 mb-2">
                Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="input-field"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                required
                placeholder="e.g., Cattle, Poultry, Swine"
              />
            </div>

            <div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-sage-300 rounded"
                  checked={formData.isHealthy}
                  onChange={(e) =>
                    setFormData({ ...formData, isHealthy: e.target.checked })
                  }
                />
                <span className="ml-2 text-sm text-sage-700">
                  Animal is healthy
                </span>
              </label>
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-sage-200">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/animals")}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading
                  ? "Saving..."
                  : isEdit
                    ? "Update Animal"
                    : "Create Animal"}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};
