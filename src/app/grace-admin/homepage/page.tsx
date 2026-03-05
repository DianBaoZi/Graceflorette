import { getHomepageSections } from "@/lib/actions/homepage-sections";
import AdminLayout from "@/components/admin/AdminLayout";
import HomepageSectionsClient from "./HomepageSectionsClient";

export default async function HomepagePage() {
  const sections = await getHomepageSections();

  return (
    <AdminLayout>
      <div className="space-y-4 sm:space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-warm-gray">Homepage Sections</h1>
          <p className="text-warm-gray/60 mt-1 text-sm sm:text-base">
            Control which sections appear on the homepage
          </p>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 sm:p-4">
          <div className="flex items-start gap-2 sm:gap-3">
            <span className="text-lg sm:text-xl">💡</span>
            <div className="flex-1 text-xs sm:text-sm">
              <p className="font-medium text-dark mb-1">How Homepage Sections Work</p>
              <ul className="text-warm-gray space-y-1">
                <li>• <strong>Toggle sections ON/OFF</strong> - Control which appear on homepage</li>
                <li>• <strong>Tag products</strong> - Assign products to sections in Products page</li>
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
