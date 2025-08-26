import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Test the Apify API with a simple request
    const testInput = {
      selectPageType: "get-manufacturers-by-type-id-lang-id-country-id",
      typeId: 1,
      langId: 6,
      countryId: 6,
    }

    const response = await fetch('/api/apify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testInput),
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Apify API test failed: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    return NextResponse.json({
      success: true,
      message: 'Apify API is working correctly',
      data: {
        hasData: !!data.data,
        dataLength: data.data?.length || 0,
        firstItem: data.data?.[0] || null,
        hasManufacturers: !!(data.data?.[0]?.manufacturers),
        manufacturersCount: data.data?.[0]?.manufacturers?.length || 0
      }
    })
  } catch (error) {
    console.error('Apify API test error:', error)
    return NextResponse.json(
      { error: 'Apify API test failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
