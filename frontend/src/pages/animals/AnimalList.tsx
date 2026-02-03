import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { StatusBadge } from "../../components/common/StatusBadge";
import { animalsApi } from "../../api/client";
import type { Animal } from "../../types";
import { Plus, Edit, Trash2 } from "lucide-react";

export const AnimalList: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    try {
      const response = await animalsApi.getAll();
      setAnimals(response.data);
    } catch (error) {
      console.error("Error fetching animals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this animal?")) {
      try {
        await animalsApi.delete(id);
        fetchAnimals();
      } catch (error) {
        console.error("Error deleting animal:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-sage-600">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-sage-900">Animals</h1>
          <p className="text-sage-600 mt-2">Manage your livestock</p>
        </div>
        <Link to="/animals/new">
          <Button>
            <Plus className="h-4 w-4 mr-2 inline" />
            Add Animal
          </Button>
        </Link>
      </div>

      <Card>
        {animals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sage-600 mb-4">No animals found</p>
            <Link to="/animals/new">
              <Button>
                <Plus className="h-4 w-4 mr-2 inline" />
                Add Your First Animal
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-sage-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                    Health Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-sage-200">
                {animals.map((animal) => (
                  <tr
                    key={animal.id}
                    className="hover:bg-sage-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-900">
                      {animal.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sage-900">
                      {animal.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-600">
                      {animal.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={animal.isHealthy} type="health" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/animals/edit/${animal.id}`}>
                        <Button variant="secondary" className="mr-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(animal.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};
