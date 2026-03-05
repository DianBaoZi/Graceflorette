import { getHomepageSections } from "@/lib/actions/homepage-sections";
import AdminLayout from "@/components/admin/AdminLayout";
import HomepageSectionsClient from "./HomepageSectionsClient";

export default async function HomepagePage() {
  const sections = await getHomepageSections();

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-warm-gray">Homepage Sections</h1>
          <p className="text-warm-gray/60 mt-1">
            Control which sections appear on the homepage
          </p>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div className="flex-1 text-sm">
              <p className="font-medium text-dark mb-1">How Homepage Sections Work</p>
              <ul className="text-warm-gray space-y-1 text-xs">
                <li>• <strong>Toggle sections ON/OFF</strong> - Control which appear on homepage</li>
                <li>• <strong>Tag products</strong> - Assign products to sections when editing them</li>
                <li>• <strong>Auto-display</strong> - Homepage shows enabled sections with their products</li>
              </ul>
            </div>
          </div>
        </div>

        <HomepageSectionsClient sections={sections} />
      </div>
    </AdminLayout>
  );
}
